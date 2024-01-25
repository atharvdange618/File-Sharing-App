require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    // Database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
        .then(() => {
            const connection = mongoose.connection;
            console.log('Database connected');
        })
        .catch((err) => {
            console.error('Connection failed:', err.message);
        });
}

module.exports = connectDB;