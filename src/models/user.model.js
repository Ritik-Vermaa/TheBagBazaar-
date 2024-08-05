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
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
    orders: {
        type: Array,
        default: []
    },
    contect : {
        type: Number,
        trim: true
    },
    picture:String,
});

module.exports = mongoose.model('User', userSchema);
