const UsuarioModel = require("../schemas/Usuario.schema");
const encrypter = require("../services/encrypter.service");
const s3 = require("../services/s3.service");
const jwt = require('../services/jwt.service');

const Usuario = UsuarioModel.Usuario;

module.exports = {
  login: (req, res) => {
    Usuario.findOne({ email: req.body.email }).exec((err, usuario) => {
      if (err || !usuario){
        res.render("login", {
          title: "login",
          email: req.body.email,
          mensagem: "Não foi possível fazer login."
        });
      }

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
        const token = jwt.gerarToken(req.body.email);
        console.log(token);
        res.cookie('token', token);
        res.cookie('usuario', usuario.usuario);

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
    const tokenEmail = jwt.verificarToken(req.cookies.token);

    console.log(req.cookies);
    

    Usuario.findOne({ usuario: req.params.usuario }).exec((err, usuario) => {
      if (err) { res.status(404).send("Usuário não existe");}
     else if (usuario.email == tokenEmail.email){  
      res.render("usuario/perfil", {
        title: "Perfil",
        foto: usuario.foto,
        nome: usuario.nome,
        usuario: usuario.usuario,
        email: usuario.email
      });}
      else {
        res.redirect(`${req.cookies.usuario}`);
      }
    });
  },
  editarUsuario: (req, res) => {
    console.log(`Token: ${req.cookies.token}`);
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
