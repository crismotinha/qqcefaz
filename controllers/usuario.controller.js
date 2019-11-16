const mongoose = require("mongoose");
const db = require("../services/database.service");

db.dbConnect();

const Produto = mongoose.Schema({
  nome: String,
  descricao: String,
  valor: Number,
  url: String,
});

const Usuario = mongoose.model(('Usuario'), new mongoose.Schema({
  nome: String,
  email: String,
  produtos: [Produto],
}));

module.exports = {
  createUsuario: (req, res) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      produtos: [],
    });

    usuario.save()
    .then(() => {
      res.json({
        title: "Usuario criado!",
      });
    })
    .catch(err => console.log(err));
  },
  login: (req, res) => {   
    Usuario.findOne({email: req.body.email})
    .then((usuario) => {
      res.cookie('nome', usuario.nome)
      res.cookie('email', usuario.email)
      res.redirect("/")
    })
    .catch(err => console.log(err));
  },
  addProduto: (req, res) => {
    const produto = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      valor: req.body.valor,
      url: req.body.url,
    };
    const email = req.cookies['email'];
    Usuario.findOneAndUpdate({email}, {$push: {'produtos': produto}}, {new:true})
    .then((user) => {
      res.redirect("/meus-produtos");
    })
    .catch(err => console.log(err));
  },
  getProduto: (req, res) => {
    Usuario.findOne({email: req.cookies['email']})
    .then((usuario) => {
      res.render('meus-produtos', { title: 'qqcefaz', usuario });
    })
    .catch(err => console.log(err));
  }
}
