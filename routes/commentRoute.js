const express = require('express')
const router = express.Router()
const Controller = require('../controllers/commentController')
const {verifyUserToken} = require('../middleware/verify')
const {USER_TOKEN_SECRET} = process.env

router.get('/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.getCommentsByProduct)
router.post('/add/product/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.addComment)
router.post('/update/:commentId/product/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.updateComment)

module.exports = router