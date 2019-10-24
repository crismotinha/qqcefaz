const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    gerarToken: email => {
        return jwt.sign({email: email}, process.env.SECRET);
    },
    verificarToken: token => {
        return jwt.verify(token, process.env.SECRET);
    }
}