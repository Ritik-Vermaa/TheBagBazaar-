const { is } = require('express/lib/request');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    cart: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Array,
        default: []
    },
    contect : {
        type: Number,
        required: true,
        trim: true
    },
    picture:String,
});

module.exports = mongoose.model('User', userSchema);
