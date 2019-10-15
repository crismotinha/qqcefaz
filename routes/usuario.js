var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("usuarios");
});

router.get("/cadastro", (req, res) => {
  console.log("entrou");
  res.render("usuario/cadastro");
});

router.post("/cadastro", (req, res) => {
  console.log(req.body.usuario);
  res.json({teste: 'teste'});
});

module.exports = router;
