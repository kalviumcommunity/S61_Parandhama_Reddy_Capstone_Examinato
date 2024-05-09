const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    confirmPassword:String
})