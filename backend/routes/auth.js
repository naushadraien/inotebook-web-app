const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Rehanisgoodb$oy';

// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    //Below code for authentication
    // name must be at least 3 chars long
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //check whether the user with the same email exists already
        let user = await User.findOne({ email: req.body.email });
        // console.log(user)
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
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
        success = true;
        res.json({success, authtoken})
        //catching the errors
    } catch (error) {
        //logging the error on console
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Internal Server Error");
    }
})



// Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    //Below code for authentication
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password cannot be blank
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    //here used destructuring and checks for the password typed is correct
    const {email, password} = req.body;
    try {
        //for verifying the user if exists or not and this returns promise
        let user =   await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct Credentials"});
        }
        //comparing the password using bcryptjs and bcrypt.compare() is a asynchronous function so used await before that function
        const passwordCompare = await bcrypt.compare(password, user.password);
        //if typed password doesnot matched
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct Credentials"});
        }
        //if typed password is correct
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken})
    } catch (error) {
        //logging the error on console
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Internal Server Error");
    }


});

// Route 3: Get loggedin User detils except password from fetchuser.js using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

try {
    userId = req.user.id;
    // select("-password") is used to select all the details of user except the password
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
     //logging the error on console
     console.error(error.message);
     //if some error occured show 500 error which is internal server error
     res.status(500).send("Internal Server Error");
}
})


module.exports = router