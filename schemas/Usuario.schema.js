const mongoose = require('mongoose');
const database = require('../services/database.services');

const Schema = mongoose.Schema;
const Model = mongoose.Model();
const connection = database.dbConnect;

const Usuario = Model('Usuario', new Schema({
    nome: String,
    email: {
        type: String,
        unique: true
    },
    senha: String,
    token: String,
    usuario: String
}));

module.exports({
    Usuario: Usuario,
    cadastrarUsuario: (novoUsuario, upsert = false) => {
        novoUsuario.save().then(
            err, resp => {
                if (err) {
                    console.error(err);
                    
                }
                return resp; //TODO: testar função
            }
        )
    }
})