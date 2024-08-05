const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:Buffer,
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
        default: '#000'
    },
    panelColor : {
        type: String,
        default: '#000'
    },
    textColor : {
        type: String,
        default: '#000'
    },
});

module.exports = mongoose.model('Product', productSchema);