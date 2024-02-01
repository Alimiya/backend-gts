const express = require('express')
const router = express.Router()
const Controller = require('../controllers/productController')
const {verifyAdminToken, verifyUserToken} = require('../middleware/verify')
const {ADMIN_TOKEN_SECRET, USER_TOKEN_SECRET} = process.env

router.get('/', Controller.getProducts)
router.get('/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.getProductById)
router.get('/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getProductById)

module.exports = router