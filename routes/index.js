var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
  const orderBy = req.query.orderBy;
  UsuarioController.getAllProdutos(req, res, user, orderBy);
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
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    UsuarioController.getProduto(req, res, user);
});

router.get('/produto', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    const id = req.query.id;
    UsuarioController.getProdutoById(req, res, user, id);
});

router.post('/produto', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    const id = req.body.idProduto;
    UsuarioController.addOrEditProduto(req, res, user, id);
});

router.get('/deletar-produto', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    const id = req.query.id;
    UsuarioController.deleteProduto(req, res, user, id);
});

module.exports = router;
