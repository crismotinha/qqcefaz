const express = require("express");
const router = express.Router();
const IndexController = require('../controllers/index.controller');

router.get('/index', (req, res) => {
  res.render('index');
})

/* GET home page. */
router.get("/", (req, res, next) => {
  IndexController.usuarioLogado(req, res);
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

module.exports = router;
