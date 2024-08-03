const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies.Token;

        if (!token) {
            req.flash('error', 'User not logged in');
            return res.redirect('/');
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        let currentUser = await userModel.findById(verifyToken.id);

        if (!currentUser) {
            return res.status(401).json({ message: "User not logged in" });
        }

        req.user = currentUser;
        next();

    } catch (error) {
        req.flash('error', 'User not logged in');
        return res.redirect('/');
    }
}