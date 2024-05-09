const mongoose = require('mongoose');

const loginSchema = new Schema({
    email:String,
    password:String
})