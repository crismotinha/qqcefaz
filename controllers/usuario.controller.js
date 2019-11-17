const mongoose = require("mongoose");
const db = require("../services/database.service");

db.dbConnect();

const Produto = mongoose.model(('Produto'), new mongoose.Schema({
  nome: String,
  descricao: String,
  valor: Number,
  url: String,
  userEmail: String,
}));

const Usuario = mongoose.model(('Usuario'), new mongoose.Schema({
  nome: String,
  email: String,
}));

module.exports = {
  createUsuario: (req, res) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
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
  addProduto: (req, res, usuario) => {
    const produto = new Produto({
      nome: req.body.nome,
      descricao: req.body.descricao,
      valor: req.body.valor,
      url: req.body.url,
      userEmail: usuario.email,
    });

    produto.save()
    .then(() => {
      res.redirect("/meus-produtos");
    })
    .catch(err => console.log(err));
  },
  getProduto: (req, res, usuario) => {
    Produto.find({userEmail: usuario.email})
    .then((produtos) => {
      res.render('meus-produtos', { title: 'qqcefaz', usuario, produtos });
    })
    .catch(err => console.log(err));
  },
  getAllProdutos: (req, res, usuario) => {
    Produto.find({})
    .then(produtos => res.render('index', { title: 'qqcefaz', produtos, usuario }))
  },
  deleteProduto: (req, res, usuario, idProduto) => {
    Produto.deleteOne({userEmail: usuario.email, _id: idProduto})
    .then((produto) => {
      res.redirect('/meus-produtos');
    })
    .catch(err => console.log(err));
  },
}
