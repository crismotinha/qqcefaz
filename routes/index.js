var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/usuario', (req, res)=>{
    UsuarioController.createUsuario(req, res);
});

router.get('/usuario', (req, res)=>{
    res.render('usuario', { title: 'Express' });
});

module.exports = router;
