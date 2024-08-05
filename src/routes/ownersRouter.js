const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner.model')

try {
    if(process.env.NODE_ENV === 'development')
        {
            router.post('/create', async (req, res) => {
                let checkOwner = await ownerModel.find();
                if(checkOwner.length>0)
                {
                    return res
                    .status(500)
                    .json({message:"You do not have permission to create owner"});
                }
        
                let { name, email, password, } = req.body;
                let createOwner = await ownerModel.create({ 
                    name, 
                    email, 
                    password 
                });
        
                res.status(201).json({message:"Owner created successfully", data:createOwner});
            });
        }
} catch (error) {
    res.status(500).json({message: error.message});
}

console.log(process.env.NODE_ENV);

router.get('/admin' , function(req , res){
    let success = req.flash('success');
    res.render('createproducts', {success});
})

module.exports = router;