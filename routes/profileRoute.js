const express = require('express')
const router = express.Router()
const Controller = require('../controllers/profileController')
const {verifyUserToken} = require('../middleware/verify')
const {USER_TOKEN_SECRET} = process.env

module.exports = router