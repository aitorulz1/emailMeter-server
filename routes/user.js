const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El mail debe de ser válido").isEmail(),
    check("password", "El nombre es obligatorio").isLength({ min: 3 }),
  ],
  userController.crearUser
);

router.get("/:id", userController.getTheUser)
router.get("/", userController.getAllUsers)

module.exports = router;
