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
    usuario: String,
    excluido: Boolean,
    foto: String,
    administrador: Boolean
  })
);

module.exports = {
  Usuario: Usuario,
  cadastrarUsuario: (novoUsuario) => {
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
  desativaUsuario: null,
  usuarioAdministrador: (usuario) => {
    return Usuario.findOne({usuario: usuario})
    .exec((err, usuario) => {
      if (err || !usuario) {
        return false;
      } else if (usuario.administrador){
        return true;
      } else {
        return false;
      }
    })
  }
};
