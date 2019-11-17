var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
  const query = req.query;
  UsuarioController.getAllProdutos(req, res, user, query);
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
    res.render('login', { title: 'qqcefaz' });
});

router.get('/meus-produtos', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    const orderBy = req.query.orderBy;
    UsuarioController.getProduto(req, res, user, orderBy);
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

router.get('/comprar-produto', (req, res)=> {
    const id = req.query.id;
    const emailVendedor = req.query.emailVendedor;
    UsuarioController.getProdutoAllInfos(req, res, id, emailVendedor);
});

router.post('/perfil', (req, res) => {
    UsuarioController.updatePerfil(req, res);
})

router.get('/perfil', (req, res)=> {
    const email = req.cookies["email"];
    UsuarioController.getPerfil(req, res, email);
});

module.exports = router;
