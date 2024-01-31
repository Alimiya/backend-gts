const express = require('express')
const router = express.Router()
const Controller = require('../controllers/subcommentController')
const {verifyAdminToken, verifyUserToken} = require('../middleware/verify')
const {ADMIN_TOKEN_SECRET, USER_TOKEN_SECRET} = process.env

router.post('/add/product/:id/comment/:commentId', Controller.addSubcomment)

module.exports = router