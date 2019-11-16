const mongoose = require("mongoose");
const db = require("../services/database.service");

db.dbConnect();

const Usuario = mongoose.model(('Usuario'), new mongoose.Schema({
  nome: String,
  email: String
}));

module.exports = {
  createUsuario: (req, res) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email
    });

    usuario.save()
    .then(() => {
      res.json({
        title: "Usuario criado!",
      });
    })
    .catch(err => console.log(err));
  },
}
