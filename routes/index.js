var express = require("express");
var router = express.Router();
var auth = require("../services/auth.service");

/* GET home page. */
router.get("/", auth.isAuthorized, function(req, res, next) {
  res.render("index", { title: "qqcefaz?" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

module.exports = router;
