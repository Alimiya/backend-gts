const express = require('express')
const router = express.Router()
const Controller = require('../controllers/profileController')
const {verifyUserToken} = require('../middleware/verify')
const {USER_TOKEN_SECRET} = process.env
const uploadAvatar = require("../middleware/uploadAvatar")

router.get('/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.getUserById)
router.post('/update/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.updateProfile)
router.post('/avatar/update/:id', verifyUserToken(USER_TOKEN_SECRET), uploadAvatar.single('avatar'), Controller.updateAvatar)
router.post('/avatar/delete/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.deleteAvatar)

module.exports = router