// routes/favorites.js

const express = require('express');
const router = express.Router();
const { connectDB } = require('../db/db');
const error = require('../utilities/error');


// GET /favorites - Render the favorites page with favorite rooms
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();

        // Extract message and messageType from query parameters
        const message = req.query.message;
        const messageType = req.query.messageType;

        // Fetch all favorite rooms
        const favoriteRooms = await db.collection('favoriteRooms').find({}).toArray();

        res.render('favorites', {
            favoriteRooms,
            message,
            messageType
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// POST /favorites/:id/remove - Remove a room from favorites
router.post('/:id/remove', async (req, res) => {
    try {
        const db = await connectDB();
        const favoriteId = req.params.id;

        // Remove the favorite room by its unique _id
        const result = await db.collection('favoriteRooms').deleteOne({ _id: favoriteId });

        if (result.deletedCount === 0) {
            // Redirect back with an error message if no document was deleted
            return res.redirect('/favorites?message=Room not found in favorites&messageType=error');
        }

        // Redirect back with a success message
        res.redirect('/favorites?message=Removed from favorites&messageType=success');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
