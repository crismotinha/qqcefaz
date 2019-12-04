var express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

// Home
router.get('/', function(req, res, next) {
  const user = {nome: req.cookies["nome"], email: req.cookies["email"], foto: req.cookies["foto"]};
  const query = req.query;
  UsuarioController.getAllProdutos(req, res, user, query);
});

// Login e logout
router.get('/logout', (req, res)=> {
    UsuarioController.logout(req, res);
});

router.get('/usuario', (req, res)=> {
    res.render('login', { title: 'qqcefaz', login: true });
});

// Gestão de produtos do usuário

router.get('/meus-produtos', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"], foto: req.cookies["foto"]};
    const orderBy = req.query.orderBy;
    UsuarioController.getProduto(req, res, user, orderBy);
});

router.get('/produto', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"], foto: req.cookies["foto"]};
    const id = req.query.id;
    UsuarioController.getProdutoById(req, res, user, id);
});

router.post('/produto', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"], foto: req.cookies["foto"]};
    const id = req.body.idProduto;
    UsuarioController.addOrEditProduto(req, res, user, id);
});

router.get('/deletar-produto', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"], foto: req.cookies["foto"]};
    const id = req.query.id;
    UsuarioController.deleteProduto(req, res, user, id);
});

// Visualizando um produto específico e denuncia

router.get('/comprar-produto', (req, res)=> {
    const id = req.query.id;
    const emailVendedor = req.query.emailVendedor;
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    UsuarioController.getProdutoAllInfos(req, res, id, emailVendedor, user);
});

router.get('/denuncia', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    const id = req.query.id;
    UsuarioController.getProdutoDenuncia(req, res, id, user);
});

router.post('/denuncia', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    const email = req.cookies["email"];
    UsuarioController.postProdutoDenuncia(req, res, email);
});

// Gestão de conta do usuário

router.post('/usuario', (req, res)=> {
    if(req.body['action'] == 'cadastro') {
        UsuarioController.createUsuario(req, res);
    }
    else {
        UsuarioController.login(req, res);
    }
});

router.post('/perfil', (req, res) => {
    UsuarioController.updatePerfil(req, res);
})

router.get('/perfil', (req, res)=> {
    const user = {nome: req.cookies["nome"], email: req.cookies["email"]};
    UsuarioController.getPerfil(req, res, user.email, user);
});

module.exports = router;
