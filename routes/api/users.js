const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');


//Load User model
const User = require('../models/User.js');

//@route GET api/users/test
//@desc Tests users route
//@access Public


router.get('/test', (req,res) => res.json({msg:"Users Works!"}));

//@route GET api/users/register
//@desc Register users route
//@access Public
router.post('/register', (req,res) =>{
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(400).json({email:'Email already in use'});
        } else {
            const avatar = gravatar.url(req.body.email,{
                s: '200',
                r: 'x',
                d:'mn'
            });
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
        }
    })
});

module.exports = router;