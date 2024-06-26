const bcrypt = require("bcryptjs")
const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const {generateAdminToken, generateUserToken} = require('../middleware/token')

exports.register = async (req, res) => {
    const {username, name, surname, address, phone, password} = req.body
    let cart = null
    const userExist = await User.findOne({username})
    if (userExist) return res.json({message: "User already exists"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
        username,
        name,
        surname,
        address,
        phone,
        password: hashedPassword,
    })
    try {
        await user.save()
        let cart = new Cart({user: user._id, productId: []})
        await cart.save()
        res.redirect('/auth/login')
    } catch (err) {
        res.json(err)
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user) return res.json({message: "Incorrect username"})

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.json({message: "Incorrect password"})

    try {
        const token = user.role === 'Admin' ? generateAdminToken(user) : generateUserToken(user)
        res.cookie(user.role, token, {maxAge: process.env.TOKEN_EXPIRE * 1000, httpOnly: true, secure:true, sameSite: 'Strict'})
        res.header('Authorization', `Bearer ${token}`)
        if(user.role === 'Admin') return res.redirect('/admin')
        if(user.role === 'User') return res.redirect('/')
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('Admin')
        res.clearCookie('User')
        res.redirect('/')
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}