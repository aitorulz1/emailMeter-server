const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No hay token'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.user = cifrado.user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg:'Token no válido'})
    }
}