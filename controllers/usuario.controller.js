const bcryptjs = require("bcryptjs");
const mongoose = require("../services/database.service");
const dotenv = require("dotenv").config();
const multer = require("muter");
const multerS3 = require("multer-s3");
const Usuario = require('../schemas/Usuario.schema');
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

module.exports({
    cadastrarUsuario: (req, res) => {

    }
});