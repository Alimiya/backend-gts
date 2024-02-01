const express = require('express')
const router = express.Router()
const Controller = require('../controllers/profileController')
const {verifyUserToken} = require('../middleware/verify')
const uploadAvatar = require("../middleware/uploadAvatar")
const {USER_TOKEN_SECRET} = process.env

router.post('/update/:id', verifyUserToken(USER_TOKEN_SECRET), Controller.updateProfile)
router.post('/update/avatar/:id', verifyUserToken(USER_TOKEN_SECRET), uploadAvatar.single('avatar'), Controller.updateAvatar)

module.exports = router