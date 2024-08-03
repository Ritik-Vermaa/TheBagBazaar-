const jwt = require('jsonwebtoken');

const createToken = (createUser) => {
    return jwt.sign({ email:createUser.email , id: createUser._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

module.exports.createToken = createToken;