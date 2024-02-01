const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require("express-session")
require("dotenv").config({path: "config/.env"})

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(session({
    secret:process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    carts: {}
}))

const adminRoute = require('./routes/adminRoute')
const authRoute = require('./routes/authRoute')
const cartRoute = require('./routes/cartRoute')
const commentRoute = require('./routes/commentRoute')
const productRoute = require('./routes/productRoute')
const profileRoute = require('./routes/profileRoute')
const subcommentRoute = require('./routes/subcommentRoute')
const likeRoute = require('./routes/likeRoute')

app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/cart', cartRoute)
app.use('/api/comment', commentRoute)
app.use('/api/product', productRoute)
app.use('/api/profile', profileRoute)
app.use('/api/subcomment', subcommentRoute)
app.use('/api/like', likeRoute)


const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Database is connected")
            })
            .catch((error) => console.log(error.message))
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app