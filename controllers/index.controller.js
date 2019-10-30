const jwt = require("../services/jwt.service");

module.exports = {
  usuarioLogado: (req, res) => {
    try {
      let usuarioValidado = jwt.verificarToken(req.cookies.token);

      if (usuarioValidado) {
        res.render("index", { title: "Homepage | qqcefaz?" });
      } else {
        res.render("login", { title: "Login | qqcefaz?" });
      }
    } catch (e) {
      res.render("login", { title: "Login | qqcefaz?" });
    }
  }
};
