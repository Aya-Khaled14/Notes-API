const Note = require('../models/note');

const authorize = async (req, res, next) => {
    const noteId = req.params.id;
    const userId = req.user;   

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        if (note.user.toString() !== userId) {
            console.log(note.user.toString());
            console.log(userId);

            return res.status(403).json({ error: 'You are not authorized to edit this note' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
module.exports = authorize;