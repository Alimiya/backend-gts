const bcrypt = require('bcryptjs')
const User = require("../models/userModel")

exports.updateProfile = async (req, res) => {
    const {name, surname, address, phone, password} = req.body
    const id = req.params.id
    const userId = req.user._id
    try {
        if (id !== userId) return res.json({message: "Not same user"})
        const salt = await bcrypt.genSalt()
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {name, surname, address, phone, password},
            {new: true}
        )
        res.redirect(`/profile/${id}`)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateAvatar = async (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    if(id!==userId) return res.json({message:"Not same user"})
    const avatar = req.file
    if (!avatar) return res.json({message: 'No file'})

    try {
        const uploadedPath = avatar.filename
        const image = '/avatars/' + uploadedPath
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {avatar: image})
        await updateUser.save()
        res.redirect(`/profile/${id}`)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}
exports.deleteAvatar = async (req, res) => {
    const userId = req.user._id
    const id = req.params.id

    if (id !== userId) return res.json({ message: "Not same user" })

    try {
        const user = await User.findById({_id:userId},{avatar:1})
        if (!user) return res.json({ message: "User not found" })

        const avatarPath = user.avatar

        user.avatar = null
        await user.save()

        res.json({ message: "Avatar deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}


exports.getUserById = async (req, res) => {
    const userId = req.user._id
    const id = req.params.id
    if(id!==userId) return res.json({message:"Not same user"})
    const user = await User.findOne({_id: userId}, {
        name: 1,
        surname: 1,
        phone: 1,
        address: 1,
        historyId: 1,
        productId: 1,
        avatar: 1
    }).populate([
        {
            path: 'historyId',
            populate: {path: 'productId', select:['quantity','title','createdAt', '_id']}
        },

    ])
    res.json({user})
}