const bcrypt = require("bcryptjs");

module.exports = {
  encriptarSenha: senhaTexto => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(senhaTexto, salt);
    return hash;
  },
  validarSenha: (senhaTexto, senhaHash) => {
    try {
      return bcrypt.compareSync(senhaTexto, senhaHash);
    } catch (error) {
      return false;
    }
  }
};
