const express = require('express');
const router = express.Router();
const { connectDB } = require('../db/db');
const error = require('../utilities/error');


router.route('/').get(async (req, res) => {



    const db = await connectDB();


    const rooms = await db.collection('listingsAndReviews').find({}).limit(10).toArray();
    res.json(rooms);



});


module.exports = router;
