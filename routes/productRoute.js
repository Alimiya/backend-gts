const express = require('express')
const router = express.Router()
const Controller = require('../controllers/productController')
const {verifyAdminToken, verifyUserToken} = require('../middleware/verify')
const {ADMIN_TOKEN_SECRET, USER_TOKEN_SECRET} = process.env

router.get('/', Controller.getProduct)

module.exports = router