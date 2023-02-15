const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Rehanisgoodb$oy';

// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    //Below code for authentication
    // name must be at least 3 chars long
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check whether the user with the same email exists already
        let user = await User.findOne({ email: req.body.email });
        // console.log(user)
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        //becryptjs is started using from here and return a promise
        const salt = await bcrypt.genSalt(10);
        //here secPass is a secret password and return a promise and await meana wait for value then go forward
        const secPass = await bcrypt.hash(req.body.password, salt); 

        //create a user
        user = await User.create({
            name: req.body.name,
            //secPass is passed in password
            password: secPass,
            email: req.body.email,
        });
        //   .then(user => res.json(user))
        //   .catch(err=> {console.log(err)
        // message: err.message is used to show the error in the thunder client window or other api tester
        //     res.json({error: 'Please enter a unique value for email', message: err.message})
        //   })

        //for sending the token we use userid to send it to DB
        //jwt token started from here
        //here data is made as js object
        const data = {
            user:{
                id: user.id
            }
        }
        //jwt.sign() is a sync method so we don't need to use await here
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        res.json({authtoken})
        //catching the errors
    } catch (error) {
        //logging the error on console
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router