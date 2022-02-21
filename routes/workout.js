const express = require("express");
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const auth = require('../middleware/auth');

router.post("/", auth, workoutController.crearWorkout)
router.get("/", workoutController.getAllWorks)


module.exports = router;