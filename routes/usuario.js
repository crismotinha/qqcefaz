const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuario.controller");
const upload = require("../services/s3.service").multer;

router.post("/login", (req, res) => {
  UsuarioController.login(req, res);
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("usuarios");
});

router.get("/cadastro", (req, res) => {
  console.log("entrou");
  res.render("usuario/cadastro", { title: "qqcefaz? | Cadastro" });
});

router.post("/cadastro", upload.single("foto"), (req, res) => {
  UsuarioController.createUsuario(req, res, req.file);
});

router.get("/:usuario", (req, res) => {
  UsuarioController.procuraUsuario(req, res);
});

router.get("/:usuario/editar", (req, res) => {
  UsuarioController.editarUsuario(req, res);
});

module.exports = router;
