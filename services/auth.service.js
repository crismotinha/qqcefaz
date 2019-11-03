// const connection = database.dbConnect;
const UsuarioModel = require("../schemas/Usuario.schema");

const Usuario = UsuarioModel.Usuario;


module.exports = {
    isAuthorized: (req, res, next) => {
    	const email = req.cookies["usuario"];
    	const token = req.cookies["token"];
    	if(!email || !token) {
    		return res.redirect('/login');
    	}
    	Usuario.findOne({ email: email, token: token })
    	.then(result => {
    		console.log('Logou');
    		console.log(result);
    		return next();
    	})
    	.catch(err => {
    		console.log("não logou");
    		console.log(err);
    		err.status = 400;
    		return next(err);
    	})
    },
}