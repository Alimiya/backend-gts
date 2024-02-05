exports.getLogin = async (req, res) => {
    res.render('auth/login')
}

exports.getRegister = async (req, res) => {
    res.render('auth/register')
}

exports.getWelcome = async (req, res) => {
    res.render('layout/welcome')
}

exports.getMain = async (req, res) => {
    res.render('layout/main')
}

exports.getProductInfo = async (req, res) => {
    res.render('layout/productInfo')
}

exports.getCommentCreate = async (req, res) => {
    res.render('components/product/createComment')
}

exports.getCommentUpdate = async (req, res) => {
    res.render('components/product/updateComment')
}

exports.getCart = async (req, res) => {
    res.render('user/cart')
}

exports.getProfile = async (req, res) => {
    res.render('user/profile')
}

exports.updateProfile = async (req, res) => {
    res.render('components/user/updateProfile')
}

exports.updateProfilePhoto = async (req, res) => {
    res.render('components/user/updatePhoto')
}

exports.getAdmin = async (req, res) => {
    res.render('user/admin')
}

exports.getCreate = async (req, res) => {
    res.render('components/admin/createProduct')
}

exports.getUpdate = async (req, res) => {
    res.render('components/admin/updateProduct')
}