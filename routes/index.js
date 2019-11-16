var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
  res.render('index', { title: 'qqcefaz', usuario:user });
});

router.post('/usuario', (req, res)=> {
    if(req.body['action'] == 'cadastro') {
        UsuarioController.createUsuario(req, res);
    }
    else {
        UsuarioController.login(req, res);
    }
});

router.get('/usuario', (req, res)=> {
    res.render('usuario', { title: 'qqcefaz' });
});

router.get('/meus-produtos', (req, res)=> {
    res.render('meus-produtos', { title: 'qqcefaz' });
});

router.get('/novo-produto', (req, res)=> {
    res.render('novo-produto', { title: 'qqcefaz' });
});

module.exports = router;
