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

exports.getCart = async (req, res) => {
    res.render('user/cart')
}

exports.getProfile = async (req, res) => {
    res.render('user/profile')
}

exports.getAdmin = async (req, res) => {
    res.render('user/admin')
}