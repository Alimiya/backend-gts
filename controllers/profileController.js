const bcrypt = require('bcryptjs')
const User = require("../models/userModel")

exports.updateProfile = async (req, res) => {
    const {name, surname, address, phone, password} = req.body
    const id = req.params.id
    const userId = req.user._id
    try {
        if (id !== userId) return res.json({message: "Not same user"})
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {name, surname, address, phone, password: hashedPassword},
            {new: true}
        )
        res.redirect('/profile')
    } catch (err) {
        console.log(err)
    }
}

exports.updateAvatar = async (req, res) => {
    const userId = req.user._id
    const avatar = req.file
    if (!avatar) return res.json({message: 'No file'})

    try {
        const uploadedPath = avatar.filename
        const image = '/avatars/' + uploadedPath
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {avatar: image})
        await updateUser.save()
        res.redirect('/profile')
    } catch (err) {
        console.log(err)
    }
}

exports.getUserById = async (req, res) => {
    const userId = req.user._id
    const user = await User.findOne({_id: userId}, {
        name: 1,
        surname: 1,
        phone: 1,
        address: 1,
        historyId: 1,
        avatar:1
    }).populate({
        path: 'historyId',
        populate: { path: 'productId' }
    })
    res.json({user})
}