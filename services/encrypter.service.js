const bcrypt = require("bcryptjs");

module.exports = {
  encriptarSenha: senhaTexto => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(senhaTexto, salt);
    console.log(hash);
    return hash;
  },
  validarSenha: (senhaTexto, senhaHash) => {
    return bcrypt.compareSync(senhaTexto, senhaHash);
  }
};
