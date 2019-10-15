const UsuarioModel = require("../schemas/Usuario.schema");
const encrypter = require("../services/encrypter.service");

const Usuario = UsuarioModel.Usuario;

module.exports = {
  createUsuario: (req, res) => {
    let novoUsuario = new Usuario();

    novoUsuario.nome = req.body.nome;
    novoUsuario.email = req.body.email;
    novoUsuario.senha = encrypter.encriptarSenha(req.body.senha);
    novoUsuario.usuario = req.body.usuario;

    let aux = UsuarioModel.cadastrarUsuario(novoUsuario);
    res.json(novoUsuario);
  }
};
