const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', [
    //Below code for authentication
    // name must be at least 3 chars long
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // email must be an email
    body('email','Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),
] ,(req, res)=>{ 
     // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
        // message: err.message is used to show the error in the thunder client window or other api tester
        res.json({error: 'Please enter a unique value for email', message: err.message})
      })
} )

module.exports = router