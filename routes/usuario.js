const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuario.controller");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("usuarios");
});

router.get("/cadastro", (req, res) => {
  console.log("entrou");
  res.render("usuario/cadastro");
});

router.post("/cadastro", (req, res) => {
  UsuarioController.createUsuario(req, res);
});

module.exports = router;
