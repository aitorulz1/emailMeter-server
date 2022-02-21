const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')

// Login usuario
router.post('/', 
    [
        check('email', 'El mail debe de ser válido').isEmail(),
        check('password', 'El password debe de tener al menos 3 caracteres').isLength({min: 3}),
    ] , authController.authUser);

module.exports = router;