const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async(req, res) => {
    const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
    if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
      let user = await User.findOne({ email })

      if(!user) {
        return res.status(400).json({msg:'El usuario no existe'})
      }

      const passCorrecto = await bcrypt.compare(password, user.password)

      if(!passCorrecto) {
          return res.status(400).json({msg:'Password Incorrecto'})
      }

      // Si todo es correcto...
      const payload = {
          user: {
              id: user.id
          }
      }

      jwt.sign(payload, process.env.SECRETA, {
        expiresIn:3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token });
            
        });
        console.log('usuario registrado con éxito')
        console.log(user)

  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error con la autenticación')
  }

}



