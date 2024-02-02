const express = require('express')
const router = express.Router()
const Render = require('../controllers/renderController')

router.get('/', Render.getWelcome)
router.get('/auth/register', Render.getRegister)
router.get('/auth/login', Render.getLogin)
router.get('/product', Render.getMain)
router.get('/cart/:id', Render.getCart)
router.get('/profile', Render.getProfile)
router.get('/admin', Render.getAdmin)

module.exports = router
