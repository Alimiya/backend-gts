const express = require('express')
const router = express.Router()
const Controller = require('../controllers/commentController')
const {verifyUserToken} = require('../middleware/verify')
const {USER_TOKEN_SECRET} = process.env

router.post('/product/:id/comment/add', Controller.addComment)
router.post('/product/:id/comment/update/:commentId', Controller.updateComment)

module.exports = router