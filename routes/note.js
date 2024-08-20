const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const User = require("../models/user");
const { authenticate } = require("../middlewares/autheticate");
const { body, validationResult } = require('express-validator');
const authorize = require('../middlewares/authorize');
const { newNoteValidator } = require('./validators');
  

//new note
router.post(
  '/',
  authenticate,
  newNoteValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, user } = req.body;
    try {
      const existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const note = new Note({
        title,
        content,
        user,
      });
      await note.save();
      res.status(201).json(note);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);   

//view all notes 
router.get("/", authenticate, async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});  

// View a single note by ID
router.get("/:id", authenticate, async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId).populate("user", "name email");
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});   

 // Update by ID
 router.put("/:id", authenticate, authorize, async (req, res) => {
  const noteId = req.params.id;
  const updatedData = req.body;
  
  try {
      const updatedNote = await Note.findByIdAndUpdate(noteId, updatedData, { new: true, runValidators: true });

      if (!updatedNote) {
          return res.status(404).json({ error: 'Note not found' });
      }

      res.json(updatedNote);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});           
  
// delete by ID
router.delete("/:id", authenticate, authorize, async (req, res) => {
  const { id } = req.params;
  
  try {
      const result = await Note.findByIdAndDelete(id);

      if (result) {
          res.status(200).send("Note deleted");
      } else {
          res.status(404).send("Note not found");
      }
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
}); 
  
module.exports = router;