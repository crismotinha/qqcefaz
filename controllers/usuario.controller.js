const UsuarioModel = require("../schemas/Usuario.schema");
const encrypter = require("../services/encrypter.service");
const s3 = require("../services/s3.service");

const Usuario = UsuarioModel.Usuario;

module.exports = {
  createUsuario: (req, res, file) => {
    let novoUsuario = new Usuario();

    novoUsuario.nome = req.body.nome;
    novoUsuario.email = req.body.email;
    novoUsuario.senha = encrypter.encriptarSenha(req.body.senha);
    novoUsuario.usuario = req.body.usuario;
    novoUsuario.foto = file.location;

    let aux = UsuarioModel.cadastrarUsuario(novoUsuario);

    console.log("url da foto: ${file.location}");
    console.log("objeto do usuario: ${novoUsuario}");

    res.json(novoUsuario);
  },
  procuraUsuario: (req, res) => {
    Usuario.findOne({usuario: req.params.usuario})
    .exec((err, usuario) => {
      if (err) res.status(400).send('Usuário não existe');
      res.render('usuario/cadastro', {title: perfil, usuario: usuario})
    });
    ;
  }
};
