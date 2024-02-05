const express = require('express')
const router = express.Router()
const Render = require('../controllers/renderController')
const {verifyAdminToken, verifyUserToken} = require('../middleware/verify')
const {ADMIN_TOKEN_SECRET, USER_TOKEN_SECRET} = process.env

router.get('/', Render.getWelcome)

router.get('/auth/register', Render.getRegister)
router.get('/auth/login', Render.getLogin)

router.get('/product', Render.getMain)
router.get('/product/info/:id', verifyUserToken(USER_TOKEN_SECRET), Render.getProductInfo)
router.get('/product/info/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Render.getProductInfo)
router.get('/product/info/:id/comment/add',verifyUserToken(USER_TOKEN_SECRET), Render.getCommentCreate)
router.get('/product/info/:id/comment/update/:commentId',verifyUserToken(USER_TOKEN_SECRET), Render.getCommentUpdate)

router.get('/cart/:id', verifyUserToken(USER_TOKEN_SECRET), Render.getCart)

router.get('/profile/:id', verifyUserToken(USER_TOKEN_SECRET), Render.getProfile)
router.get('/profile/update/:id', verifyUserToken(USER_TOKEN_SECRET), Render.updateProfile)
router.get('/profile/avatar/update/:id', verifyUserToken(USER_TOKEN_SECRET), Render.updateProfilePhoto)

router.get('/admin', verifyAdminToken(ADMIN_TOKEN_SECRET), Render.getAdmin)
router.get('/admin/product/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Render.getCreate)
router.get('/admin/product/update/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Render.getUpdate)

module.exports = router
