const bcryptjs = require("bcryptjs");
//const mongoose = require("../services/database.service");
const dotenv = require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const UsuarioSchema = require('../schemas/Usuario.schema');
const AWS = require('aws-sdk');
const encrypter = require('../services/encrypter.service');

AWS.config.update({region: 'us-east-2'});
const Usuario = UsuarioSchema.Usuario;

const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

module.exports({
    cadastrarUsuario: (req, res) => {
        let novoUsuario = new Usuario();

        novoUsuario.nome = req.body.nome;
        novoUsuario.email = req.body.email;
        novoUsuario.senha = encrypter.encriptarSenha(req.body.senha);
        novoUsuario.usuario = req.body.usuario;

        res.json({
            usuario: {
                nome: req.body.nome,
                email: req.body.email,
                senha: encrypter.encriptarSenha(req.body.senha),
                usuario: req.body.usuario
            }            
        })
        
    }
});