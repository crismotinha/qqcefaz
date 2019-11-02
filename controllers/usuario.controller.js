const UsuarioModel = require("../schemas/Usuario.schema");
const encrypter = require("../services/encrypter.service");
const jwt = require("../services/jwt.service");

const Usuario = UsuarioModel.Usuario;

module.exports = {
  login: (req, res) => {
    Usuario.findOne({
      email: req.body.email
    })
      .select("email senha -_id") //retorna apenas o email e a senha sem o id
      .exec((err, usuario) => {
        if (err || !usuario) {
          res.render("login", {
            title: "login",
            email: req.body.email,
            mensagem: "Um erro ocorreu. Por favor, tente novamente."
          });
        } else {
          const usuarioValido = encrypter.validarSenha(
            req.body.senha,
            usuario.senha
          );

          //TODO: encriptar senha no front
          if (!usuarioValido) {
            //TODO: Essa porra não manda pro caralho do root
            res.render("login", {
              title: "login",
              email: req.body.email,
              mensagem: "Um erro ocorreu. Por favor, tente novamente."
            });
          } else {
            const token = jwt.gerarToken(req.body.email);
            res.cookie("token", token);

            res.redirect("/index");
          }
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

    const token = jwt.gerarToken(req.body.email);

    res.cookie("token", token);

    res.redirect("/index");
  },
  procuraUsuario: (req, res) => {
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
  paginaEdicaoUsuario: (req, res) => {
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
  editarUsuario: (req, res, file) => {
    Usuario.findOne({usuario: req.body.usuario})
    .exec((err, usuario) => {
      if (encrypter.validarSenha(req.body.senhaAtual, usuario.senha)) {
        Usuario.updateOne({_id: usuario._id}, 
          {foto: (file != null ? file.location : usuario.foto),
            senha: encrypter.encriptarSenha(req.body.senha),
            nome: req.body.nome},
            (err, usuarioAtualizado) => {
              if (usuarioAtualizado) {
                res.redirect(`/usuario/${usuario.usuario}`);
              } else {
                res.render("usuario/editar", {
                  title: "Edição de Perfil",
                  foto: usuario.foto,
                  nome: usuario.nome,
                  usuario: usuario.usuario,
                  email: usuario.email,
                  mensagemGeral: "Não foi possível atualizar a conta."
                });
              }
            })
      } else {
        res.render("usuario/editar", {
          title: "Edição de Perfil",
          foto: usuario.foto,
          nome: usuario.nome,
          usuario: usuario.usuario,
          email: usuario.email,
          mensagemSenhaAtual: " A senha atual está incorreta.",
          mensagemGeral: "Não foi possível atualizar a conta"
        });
      }
    })
  },
  deletarUsuario: (req, res) => {
    Usuario.deleteOne({ usuario: req.params.usuario }, err => {
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
  procuraUsuarioExiste: (req, res) => {
    Usuario.find({ usuario: req.body.usuario })
      .select("email -_id")
      .exec((err, usuario) => {
        if (err || usuario.toString() === "") {
          res.json({ existe: false });
        } else {
          res.json({ existe: true });
        }
      });
  },
  informacoesNavbar: (req, res) => {
    let tokenTraduzido = jwt.verificarToken(req.body.token);
    Usuario.findOne({ email: tokenTraduzido.email })
      .select("foto nome email usuario -_id")
      .exec((err, usuario) => {
        if (err || !usuario) {
          res.json({ foto: null, email: null, nome: null });
        } else {
          res.json({
            foto: usuario.foto,
            nome: usuario.nome,
            email: usuario.email,
            usuario: usuario.usuario
          });
        }
      });
  },
  logout: (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
  }
};
