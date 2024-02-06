const express = require('express')
const router = express.Router()
const Controller = require('../controllers/authController')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/logout', Controller.logout)

module.exports = router