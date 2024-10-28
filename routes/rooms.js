// routes/rooms.js

const express = require('express');
const router = express.Router();
const { connectDB } = require('../db/db');
const error = require('../utilities/error');

// GET /rooms - Render the rooms page with paginated and filtered data
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();

        // Pagination parameters
        const page = parseInt(req.query.page) || 1;       // Current page number
        const limit = parseInt(req.query.limit) || 10;    // Number of rooms per page
        const skip = (page - 1) * limit;                  // Number of rooms to skip

        // Filter parameter
        const beds = parseInt(req.query.beds) || null;    // Number of bedrooms to filter by

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

module.exports = router;
