const express = require("express");
const router = express.Router();
const upload = require('../config/multer.config.js');
const productModel = require('../models/product.model.js');


router.post('/create', upload.single('image'), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelColor, textColor } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let createProduct = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelColor,
            textColor
        });

        req.flash('success', 'Product created successfully');
        res.redirect('/owners/admin');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;