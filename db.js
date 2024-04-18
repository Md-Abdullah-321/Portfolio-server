const mongoose = require('mongoose');
require("dotenv").config();
const Database_URL = process.env.DATABASE_URL;

const connectionDB = async (options = {}) => {
    try {
        await mongoose.connect(Database_URL);
        console.log("Database Connected");

        mongoose.connection.on('error', (error) => {
            console.log(error);
        })
    } catch (error) {
        console.log('Could not connect to Database');
        console.log(error);
    }
}


module.exports = connectionDB;