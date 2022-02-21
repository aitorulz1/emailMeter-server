const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Crear User

exports.crearUser = async (req, res) => {
    const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
  
    const { name, username, email, password, date_joined, workouts: [] } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "El usuario ya existe" });
      } else {
        user = new User(req.body);
      }
  
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      const payload = {
        user: {
          id: user.id
        },
      };
  
      // Firmar el jwt
      jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: 3600, // 1 hora
        },
        (error, token) => {
          if (error) {
            throw error;
          } else {
            res.json({ token });
            res.json(user.id)
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error");
    }
}

// Obtener User By ID

exports.getTheUser = async(req, res) => {

    try {
      const user = await User.findById(req.params.id)
      .populate('workouts')
      .populate({
        path:'workouts',
        populate:{
          path:'user'
        }
      })
      if(!user) {
        res.status(400).json({msg:'El usuario no existe'})
      } else {
        res.json(user)
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error trayendo el usuario");
    }
  }


  // Obtener All Users

  exports.getAllUsers = async(req, res) => {

    try {
      const users = await User.find()
      .populate('workouts')
      if(!users) {
        res.status(400).json({msg:'No hay ningún usuario registrado'})
      } else {
        res.json(users)
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error trayendo todos los usuario");
    }
  }


  