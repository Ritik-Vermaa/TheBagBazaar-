const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/createToken');

module.exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let findUser = await userModel.findOne({ email: email });

        if (findUser) {
            return res.status(401).json({ message: "User already exists Please Login" });
        }
        else {
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Please fill all the fields" });
            }
            else {
                let hashPassword = await bcrypt.hash(password, 10);

                let createUser = await userModel.create({
                    name,
                    email,
                    password: hashPassword
                });

                let jwtToken = createToken(createUser);
                res.cookie('Token', jwtToken, {
                    httpOnly: true,
                    secure: true
                });

                let error = req.flash('error');
                res.status(201).render('index' , {error});
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.loginUser = async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        
        let findUser = await userModel.findOne({ email: email });

        if (!findUser) return res.status(401).json({ message: "Invalid Credentials" });


        let isMatch = await bcrypt.compare(password, findUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        else {
            let jwtToken = createToken(findUser);
            res.cookie('Token', jwtToken, {
                httpOnly: true,
                secure: true
            });

            res.status(200).redirect('/shop');
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('Token');
        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

