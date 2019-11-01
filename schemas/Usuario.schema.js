const mongoose = require("mongoose");
const database = require("../services/database.service");
const connection = database.dbConnect;

const Usuario = mongoose.model(
  "Usuario",
  new mongoose.Schema({
    nome: String,
    email: { type: String, unique: true },
    senha: String,
    token: String,
    usuario: { type: String, unique: true },
    excluido: Boolean,
    foto: String
  })
);

module.exports = {
  Usuario: Usuario,
  cadastrarUsuario: (novoUsuario, upsert = false) => {
    let aux;
    novoUsuario.save().then((err, resp) => {
      if (err) return (aux = err);
      return (aux = resp);
    });
    return aux;
  },
  procuraUsuario: usuario => {
    return Usuario.find({ usuario: usuario }).exec(result => {
      return result;
    });
  },
  desativaUsuario: null
};
