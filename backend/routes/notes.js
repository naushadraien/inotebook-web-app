const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



// Route 1: Fetching all the Notes using: GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Internal Server Error");
    }

})

// Route 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    //checking for notes are not empty and code copied from auth.js
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleat 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {


            //const {title, description, tag } = req.body; using destructuring concept
            const { title, description, tag } = req.body;
            //If there are errors, return Bad request and the errors
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //Note() returns a promise
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            //if some error occured show 500 error which is internal server error
            res.status(500).send("Internal Server Error");
        }
    })



module.exports = router