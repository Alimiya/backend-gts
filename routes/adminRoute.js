const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')
const upload = require("../middleware/upload")
const {verifyAdminToken} = require('../middleware/verify')
const {ADMIN_TOKEN_SECRET} = process.env

router.get('/user/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getUserById)
router.get('/users', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getUsers)

router.get('/product/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getProductById)
router.post('/product/create', verifyAdminToken(ADMIN_TOKEN_SECRET), upload.array('file', 5), Controller.createProduct)
router.post('/product/update/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.updateProductById)
router.post('/product/delete/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.deleteProductById)
router.get('/products', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getProducts)

router.get('/comment/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getCommentsByProduct)
router.get('/comments', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getComments)

router.get('/histories', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getHistories)

module.exports = router