const express = require('express')
const router = express.Router()
const Controller = require('../controllers/cartController')
const {verifyUserToken} = require('../middleware/verify')
const {USER_TOKEN_SECRET} = process.env

router.post('/buy', verifyUserToken(USER_TOKEN_SECRET), Controller.buyCart)
router.get('/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.getCartById)
router.post('/add/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.addToCart)
router.post('/remove/:id', verifyUserToken(USER_TOKEN_SECRET) ,Controller.removeFromCart)

module.exports = router