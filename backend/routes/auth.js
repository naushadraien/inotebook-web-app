const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    //Below code for authentication
    // name must be at least 3 chars long
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // email must be an email
    body('email','Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),
] ,async (req, res)=>{ 
    //If there are errors, return Bad request and the errors
     // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with the same email exists already
    try {
        
    let user =await User.findOne({email: req.body.email});
    // console.log(user)
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
    //create a user
        user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
        // message: err.message is used to show the error in the thunder client window or other api tester
    //     res.json({error: 'Please enter a unique value for email', message: err.message})
    //   })
    res.json(user)
    //catching the errors
    }catch (error) {
        //logging the error on console
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Some Error Occured")
    }
} )

module.exports = router