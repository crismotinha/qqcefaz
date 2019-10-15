const bcrypt = require('bcryptjs');

module.exports({
    encriptarSenha: (senhaTexto) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(senhaTexto, salt, (err, hash) => {
                if (err) return err;
                return hash;
            })
        })
    }
})