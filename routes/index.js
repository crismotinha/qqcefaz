var express = require("express");
var router = express.Router();

router.get('/index', (req, res) => {
  res.render('index');
})

/* GET home page. */
router.get("/", function(req, res, next) {
  
  res.render("login", { title: "Login" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

module.exports = router;
