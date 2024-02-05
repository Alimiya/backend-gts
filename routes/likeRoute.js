const express = require('express')
const router = express.Router()
const Controller = require('../controllers/likeController')
const {verifyUserToken} = require('../middleware/verify')
const {USER_TOKEN_SECRET} = process.env

router.get('/product/:id/comment/:commentId/count', verifyUserToken(USER_TOKEN_SECRET), Controller.getCommentCount)
router.get('/product/:id/comment/:commentId/subcomment/:subcommentId/count', verifyUserToken(USER_TOKEN_SECRET), Controller.getSubcommentCount)
router.post('/product/:id/comment/:commentId', verifyUserToken(USER_TOKEN_SECRET), Controller.isLike)
router.post('/product/:id/comment/:commentId/subcomment/:subcommentId', verifyUserToken(USER_TOKEN_SECRET), Controller.isLikeSubcomment)

module.exports = router