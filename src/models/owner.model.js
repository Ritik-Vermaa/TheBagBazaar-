const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    product: {
        type: Array,
        default: []
    },
    picture: String,
    gstNo: {
        type: String,
    },
});

module.exports = mongoose.model('Owner', ownerSchema);