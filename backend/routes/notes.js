const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



// Route 1: Fetching all the Notes using: GET "/api/notes/fetchallnotes". Login required
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

// Route 2: Add a new Note using: POST "/api/notes/addnote". Login required
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

// Route 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    //using destructing to get title, description and tag of existing note from body
    const { title, description, tag } = req.body;
    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it and params are parameters
        let note = await Note.findById(req.params.id);
        //if the note to be updated not exist
        if (!note) { return res.status(404).send("Not Found") }

        //for checking if user is the same which the note belongs to and toString() gives the id of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // if the note belongs to the same user
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Internal Server Error");
    }
})


// Route 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //using destructing to get title, description and tag of existing note from body
    try {
        //Find the note to be deleted and delete it and params are parameters
        let note = await Note.findById(req.params.id);
        //if the note to be updated not exist
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletion only if user owns this note
        //for checking if user is the same which the note belongs to and toString() gives the id of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // if the note belongs to the same user
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        //if some error occured show 500 error which is internal server error
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router