const mongoose = require("mongoose");
const database = require("../services/database.service");
const connection = database.dbConnect;

const Usuario = mongoose.model(
  "Usuario",
  new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    token: String,
    usuario: String
  })
);

module.exports = {
  Usuario: Usuario,
  cadastrarUsuario: (novoUsuario, upsert = false) => {
    return novoUsuario.save().then((err, resp) => {
      if (err) return err;
      return resp;
    });
  },
  procuraUsuario: email => {
    return User.find({ email: email }).exec(result => {
      console.log(result);
      return result;
    });
  }
};
