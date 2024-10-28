// routes/rooms.js

const express = require('express');
const router = express.Router();
const { connectDB } = require('../db/db');
const error = require('../utilities/error');

// Utility function to generate unique IDs (simple example)
function generateUniqueId() {
    return Date.now().toString(); // For simplicity; consider using more robust methods like UUIDs
}

// GET /rooms/favorites - Render the favorites page with favorite rooms
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();

        // Fetch all favorite rooms
        const favoriteRooms = await db.collection('favoriteRooms').find({}).toArray();

        // Extract message from query parameters
        const message = req.query.message;

        res.render('favorites', {
            favoriteRooms,
            message
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});



module.exports = router;
