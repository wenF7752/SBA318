// routes/rooms.js

const express = require('express');
const router = express.Router();
const { connectDB } = require('../db/db');
const error = require('../utilities/error');

// Utility function to generate unique IDs (simple example)
function generateUniqueId() {
    return Date.now().toString(); // For simplicity; consider using more robust methods like UUIDs
}

// GET /rooms - Render the rooms page with paginated and filtered data
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();

        // Validate and sanitize query parameters
        let page = parseInt(req.query.page, 10);
        let limit = parseInt(req.query.limit, 10);
        let beds = parseInt(req.query.beds, 10);

        // Validate page
        if (isNaN(page) || page < 1) {
            page = 1;
        }

        // Validate limit
        if (isNaN(limit) || limit < 1 || limit > 100) { // Assuming a max limit
            limit = 10;
        }

        // Validate beds
        if (isNaN(beds) || beds < 1 || beds > 20) { // Assuming reasonable bedroom counts
            beds = null;
        }

        const skip = (page - 1) * limit;

        // Build the query object
        let query = {};
        if (beds) {
            query.bedrooms = beds;
        }

        // Fetch rooms with pagination and filtering
        const rooms = await db.collection('listingsAndReviews')
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray();

        // Fetch the total count for pagination controls
        const totalRooms = beds
            ? await db.collection('listingsAndReviews').countDocuments({ bedrooms: beds })
            : await db.collection('listingsAndReviews').countDocuments({});
        const totalPages = Math.ceil(totalRooms / limit);

        res.render('rooms', {
            rooms,
            currentPage: page,
            totalPages,
            limit,
            selectedBeds: beds
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// POST /rooms/:id/favorite - Add a room to favorites
router.post('/:id/favorite', async (req, res) => {
    try {
        const db = await connectDB();
        const roomId = req.params.id;

        // Find the room by ID
        const room = await db.collection('listingsAndReviews').findOne({ _id: roomId });

        if (!room) {
            return res.status(404).send("Room not found");
        }

        // Optional: Check if the room is already in favorites to prevent duplicates
        const existingFavorite = await db.collection('favoriteRooms').findOne({ room_id: roomId });
        if (existingFavorite) {
            // Redirect back with a message or handle as desired
            return res.redirect('/rooms?message=Already in favorites');
        }

        // Add to favoriteRooms collection
        const favoriteRoom = {
            _id: generateUniqueId(), // Implement a function to generate unique IDs if necessary
            room_id: room._id,
            name: room.name,
            picture_url: room.images.picture_url || '/images/default-room.jpg',
            property_type: room.property_type,
            room_type: room.room_type,
            bedrooms: room.bedrooms,
            date_added: new Date()
        };

        await db.collection('favoriteRooms').insertOne(favoriteRoom);

        // Redirect back with a success message
        res.redirect('/rooms?message=Added to favorites');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
