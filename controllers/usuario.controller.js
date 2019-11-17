const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const db = require("../services/database.service");

db.dbConnect();

const emailGerencial = process.env.EMAIL;
const emailPass = process.env.EMAIL_PASSWORD;


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: emailGerencial,
    pass: emailPass
  }
});

const Produto = mongoose.model(('Produto'), new mongoose.Schema({
  nome: String,
  descricao: String,
  valor: Number,
  url: String,
  userEmail: String,
  userName: String,
}));

const Usuario = mongoose.model(('Usuario'), new mongoose.Schema({
  nome: String,
  email: String,
  campus: [],
  turnos: [],
}));

const getCampus = (body) => {
  const campus = [];
  Object.keys(body).forEach(atributo => {
    if(atributo.substring(0,3) === 'CAM' && body[atributo] === 'on') campus.push(atributo.substring(3,atributo.length));
  })
  return campus;
};

const getTurnos = (body) => {
  const turno = [];
  Object.keys(body).forEach(atributo => {
    if(atributo.substring(0,3) === 'TUR' && body[atributo] === 'on') turno.push(atributo.substring(3,atributo.length));
  })
  return turno;
};

module.exports = {
  // Home
  getAllProdutos: (req, res, usuario, query) => {
    const filterCampus = getCampus(query);
    const filterTurnos = getTurnos(query);
    const sort = query.orderBy ? query.orderBy : {};

    if (filterCampus.length > 0 || filterTurnos.length > 0) {
      const filter = {};
      if (filterCampus.length > 0) {
        filter['campus'] = { '$in': filterCampus }
      }
      if (filterTurnos.length > 0) {
        filter['turnos'] = { '$in': filterTurnos }
      }

      Usuario.find(filter)
      .then(usuarios => {
        const arrayUsrID = []
        usuarios.forEach(usuario => arrayUsrID.push(usuario.email));
        if (arrayUsrID.length > 0) {
          return Produto.find({ userEmail: { '$in': arrayUsrID}})
        }
        else {
          return Promise.resolve([]);
        }
      })
      .then(produtos => res.render('index', { title: 'qqcefaz', produtos, usuario }))
      .catch(err=>console.log(err));
    }
    else {
      Produto.find({})
      .sort(sort)
      .then(produtos => res.render('index', { title: 'qqcefaz', produtos, usuario }))
    }
  },
  // Login e logout
  login: (req, res) => {   
    Usuario.findOne({email: req.body.email})
    .then((usuario) => {
      res.cookie('nome', usuario.nome)
      res.cookie('email', usuario.email)
      res.redirect("/")
    })
    .catch(err => console.log(err));
  },
  logout: (req, res) => {   
    res.clearCookie('nome');
    res.clearCookie('email');
    res.redirect("/")
  },
  // Gestão de produtos do usuário
  getProdutoById: (req, res, usuario, idProduto) => {
    Produto.findOne({userEmail: usuario.email, _id: idProduto})
    .then((produto) => {
      res.render('novo-produto', { title: 'qqcefaz', usuario, produto });
    })
    .catch(err => console.log(err));
  },
  getProduto: (req, res, usuario, orderBy) => {
    const sort = orderBy ? orderBy : {};
    Produto.find({userEmail: usuario.email})
    .sort(sort)
    .then((produtos) => {
      res.render('meus-produtos', { title: 'qqcefaz', usuario, produtos });
    })
    .catch(err => console.log(err));
  },
  addOrEditProduto: (req, res, usuario, idProduto) => {
    const produto = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      valor: req.body.valor,
      url: req.body.url,
      userEmail: usuario.email,
      userName: usuario.nome,
    };

    const query = idProduto ? { _id: mongoose.Types.ObjectId(idProduto) } : { _id: mongoose.Types.ObjectId() };

    Produto.findByIdAndUpdate(query, produto, {upsert: true})
    .then(() => {
      res.redirect("/meus-produtos");
    })
    .catch(err => console.log(err));
  },
  deleteProduto: (req, res, usuario, idProduto) => {
    Produto.deleteOne({userEmail: usuario.email, _id: idProduto})
    .then((produto) => {
      res.redirect('/meus-produtos');
    })
    .catch(err => console.log(err));
  },
  // Visualizando um produto específico e denuncia
  getProdutoAllInfos: (req, res, idProduto, emailVendedor) => {
    Promise.all([Produto.findOne({_id: idProduto}), Usuario.findOne({email: emailVendedor})])
    .then(([produto, usuario]) => res.render('produto', { title: 'qqcefaz', produto, usuario }))
    .catch(err => console.log(err));
  },
  getProdutoDenuncia: (req, res, idProduto) => {
    Produto.findOne({_id: idProduto})
    .then(produto => res.render('denuncia', {title: 'qqcefaz', produto}))
  },
  postProdutoDenuncia: (req, res, email) => {
    console.log(email, req.body);
    const text = `Recebemos uma denúncia, feita pelo usuário ${email}. Seguem os detalhes: ${JSON.stringify(req.body)}`
    console.log(text);

    transporter.sendMail(
      {
        from: emailGerencial,
        to: 'cmotinha@id.uff.br',
        subject: 'denuncia',
        text: text
      },
      (err, resp) => {
        if (err) console.log(err);
        console.log(resp)
        res.redirect('/');
      }); 
  },
  // Gestão de conta do usuário
  createUsuario: (req, res) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
    });

    usuario.save()
    .then(() => {
      res.cookie('nome', usuario.nome)
      res.cookie('email', usuario.email)
      res.redirect("/")
    })
    .catch(err => console.log(err));
  },  
  getPerfil: (req, res, email) => {
    Usuario.findOne({email: email})
    .then(usuario => res.render('perfil', { title: 'qqcefaz', usuario}))
  },
  updatePerfil: (req, res) => {
    const campus = getCampus(req.body);
    const turnos = getTurnos(req.body);

    Usuario.findById(req.body.idUsuario)
    .then(usuario => {
      usuario.nome= req.body.nome;
      usuario.campus= campus;
      usuario.turnos= turnos;

      return usuario.save()
    })
    .then(usuario => res.render('perfil', { title: 'qqcefaz', usuario}))
    .catch(err => console.log(err));
  },


}
