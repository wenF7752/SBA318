const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        // Perform database operations
        const db = client.db("sample_airbnb"); // Replace with your database name

        return db;
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

module.exports = { connectDB, client };
