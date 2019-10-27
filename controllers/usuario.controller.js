const UsuarioModel = require("../schemas/Usuario.schema");
const encrypter = require("../services/encrypter.service");
const s3 = require("../services/s3.service");
const jwt = require("../services/jwt.service");

const Usuario = UsuarioModel.Usuario;

module.exports = {
  login: (req, res) => {
    Usuario.findOne({ email: req.body.email }).exec((err, usuario) => {
      if (err || !usuario) {
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

      //TODO: encriptar senha no front
      if (!usuarioValido) {
        console.log(req.body.senha);

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
        res.cookie("token", token);
        res.cookie("usuario", usuario.usuario);

        res.redirect(`/usuario/${usuario.usuario}`);
      }
    });
  },
  createUsuario: (req, res, file) => {
    //TODO: checar e-mail
    //TODO: checar senha
    //TODO: checar usuario
    //TODO: Restringir criação de mais de um usuario com o mesmo nome
    let novoUsuario = new Usuario();

    novoUsuario.nome = req.body.nome;
    novoUsuario.email = req.body.email;
    novoUsuario.senha = encrypter.encriptarSenha(req.body.senha);
    novoUsuario.usuario = req.body.usuario;
    novoUsuario.foto = file.location;

    let aux = UsuarioModel.cadastrarUsuario(novoUsuario);

    console.log("url da foto: ${file.location}");
    console.log("objeto do usuario: ${novoUsuario}");

    res.redirect(`/usuario/${usuario.usuario}`);
  },
  procuraUsuario: (req, res) => {
    // const tokenEmail = jwt.verificarToken(req.cookies.token);

    // console.log(req.cookies);

    // Usuario.findOne({ usuario: req.params.usuario }).exec((err, usuario) => {
    //   if (err) {
    //     res.status(404).send("Usuário não existe");
    //   } else if (usuario.email == tokenEmail.email) {
    //     res.render("usuario/perfil", {
    //       title: "Perfil",
    //       foto: usuario.foto,
    //       nome: usuario.nome,
    //       usuario: usuario.usuario,
    //       email: usuario.email
    //     });
    //   } else {
    //     res.redirect(`${req.cookies.usuario}`);
    //   }
    // });

    Usuario.findOne({ usuario: req.params.usuario }).exec((err, usuario) => {
      if (err) {
        res.status(404).send("Usuário não existe");
      } else if (usuario) {
        res.render("usuario/perfil", {
          title: "Perfil",
          foto: usuario.foto,
          nome: usuario.nome,
          usuario: usuario.usuario,
          email: usuario.email
        });
      } else {
        res.redirect("/login");
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
  },
  deletarUsuario: (req, res) => {
    Usuario.deleteOne({ usuario: req.params.usuario }, err => {
      console.log("entrou na função de exlusao");

      if (err) {
        res.redirect(`/${req.params.usuario}`, {
          mensagem: "Não foi possível excluir o usuário.",
          title: "Perfil"
        });
      } else {
        res.redirect("/login");
      }
    });
  },
  procuraEmail: (req, res) => {
    console.log(req.body);

    Usuario.find({ email: req.body.email })
      .select("email -_id")
      .exec((err, email) => {
        if (err || email.toString() === "") {
          res.json({ existe: false });
        } else {
          res.json({ existe: true });
        }
      });
  },
  procuraUsuario: (req, res) => {
    console.log(req.body);

    Usuario.find({ usuario: req.body.usuario })
      .select("email -_id")
      .exec((err, usuario) => {
        if (err || usuario.toString() === "") {
          res.json({ existe: false });
        } else {
          res.json({ existe: true });
        }
      });
  }
};
