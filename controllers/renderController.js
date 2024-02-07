const Cart = require('../models/cartModel')

exports.getLogin = async (req, res) => {
    res.render('auth/login',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getRegister = async (req, res) => {
    res.render('auth/register',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getMain = async (req, res) => {
    res.render('layout/main',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getProductInfo = async (req, res) => {
    res.render('layout/productInfo',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getCommentCreate = async (req, res) => {
    res.render('components/product/createComment',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getCommentUpdate = async (req, res) => {
    res.render('components/product/updateComment',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getCart = async (req, res) => {
    const userId = req.user._id
    const cart = await Cart.findOne({userId: userId}).populate('productId')
    res.render('user/cart',{cart, admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getProfile = async (req, res) => {
    res.render('user/profile',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.updateProfile = async (req, res) => {
    res.render('components/user/updateProfile',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.updateProfilePhoto = async (req, res) => {
    res.render('components/user/updatePhoto',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getAdmin = async (req, res) => {
    res.render('user/admin',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getCreate = async (req, res) => {
    res.render('components/admin/createProduct',{admin: req.cookies.Admin, user: req.cookies.User})
}

exports.getUpdate = async (req, res) => {
    res.render('components/admin/updateProduct',{admin: req.cookies.Admin, user: req.cookies.User})
}