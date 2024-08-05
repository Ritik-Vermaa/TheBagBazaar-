const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const { use } = require('bcrypt/promises');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error, isLoggedIn: false });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    try {
        let products = await productModel.find();
        let success = req.flash('success');
        res.render('shop', { products, success });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

})

router.get('/cart', isLoggedIn, async (req, res) => {

});

router.get('/add-cart/:id', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }); // Await the query
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/shop');
        }
        user.cart.push(req.params.id);
        await user.save();
        req.flash('success', 'Product added to cart');
        res.redirect('/shop');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


router.get('/logout', isLoggedIn, (req, res) => {
    res.render('shop');
})

module.exports = router;