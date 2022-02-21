const Workout = require("../models/workout");
const { validationResult } = require("express-validator");

// Create Project

exports.crearWorkout = async(req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req); // req -> request para retornar si hay algún error y lo genera como un array
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {
        date,
        steps,
        distance,
        calories,
        active_minutes,
        user
      } = req.body;
    
      try {
        const workout = new Workout({
          date,
          steps,
          distance,
          calories,
          active_minutes,
          user
        });        
        // Guardar el creador via JWT
        workout.user = req.user.id
        // Guardar proyecto
        workout.save()
        res.json(workout)
        console.log(workout)
      } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
      }
}


  // Obtener All Works

  exports.getAllWorks = async(req, res) => {

    try {
      const works = await Workout.find()
      if(!works) {
        res.status(400).json({msg:'No hay ningún usuario registrado'})
      } else {
        res.json(works)
        console.log(works)
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error trayendo todos los usuario");
    }
  }