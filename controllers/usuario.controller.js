const UsuarioModel = require("../schemas/Usuario.schema");
const encrypter = require("../services/encrypter.service");
const s3 = require("../services/s3.service");

const Usuario = UsuarioModel.Usuario;

module.exports = {
  login: (req, res) => {
    Usuario.findOne({ email: req.body.email }).exec((err, usuario) => {
      if (err) res.status(404).send({ message: "Não achou" });
      console.log(
        "checagem: " + encrypter.validarSenha(req.body.senha, usuario.senha)
      );
      const usuarioValido = encrypter.validarSenha(
        req.body.senha,
        usuario.senha
      );
      if (!usuarioValido) {
        console.log("não validado");
        //TODO: Essa porra não manda pro caralho do root
        res.render("login", {
          title: "login",
          email: req.body.email,
          mensagem: "Não foi possível fazer login."
        });
      } else {
        console.log("validado");
        res.redirect(`/usuario/${usuario.usuario}`);
      }
    });
  },
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
    Usuario.findOne({ usuario: req.params.usuario }).exec((err, usuario) => {
      if (err) res.status(404).send("Usuário não existe");
      res.render("usuario/perfil", {
        title: "Perfil",
        foto: usuario.foto,
        nome: usuario.nome,
        usuario: usuario.usuario,
        email: usuario.email
      });
    });
  },
  editarUsuario: (req, res) => {
    Usuario.findOne({ usuario: req.params.usuario }).exec((err, usuario) => {
      if (err) res.status(404).send("Usuário não existe");
      res.render("usuario/editar", {
        title: "Perfil",
        foto: usuario.foto,
        nome: usuario.nome,
        usuario: usuario.usuario,
        email: usuario.email
      });
    });
  }
};
