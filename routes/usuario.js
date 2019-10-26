const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuario.controller");
const upload = require("../services/s3.service").multer;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("usuarios");
});

/* POST login do usuário */

router.post("/login", (req, res) => {
  UsuarioController.login(req, res);
});

/* GET para login caso caia em /usuario/login */
router.get("/login", (req, res) => {
  res.render("login");
});

/* GET cadastro do usuário */
router.get("/cadastro", (req, res) => {
  res.render("usuario/cadastro", { title: "qqcefaz? | Cadastro" });
});

/* POST cadastro do usuário */
router.post("/cadastro", upload.single("foto"), (req, res) => {
  UsuarioController.createUsuario(req, res, req.file);
});

/* GET single do usuário */
router.get("/:usuario", (req, res) => {
  UsuarioController.procuraUsuario(req, res);
});

/* GET edição do usuário */
router.get("/:usuario/editar", (req, res) => {
  UsuarioController.editarUsuario(req, res);
});

/* POST excluir usuário */
router.get("/:usuario/excluir", (req, res) => {
  console.log("Entrou na rota de exclusao");

  UsuarioController.deletarUsuario(req, res);
});
module.exports = router;
