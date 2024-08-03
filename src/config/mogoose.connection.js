const mongoose = require('mongoose');
const DB_NAME  = require('../utils/constants');
// const de_bugger = require("debug")("development:mongoose");

const connect = async () => {
    try {
        const connectionString = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Connected to database || DB HOST  :  ${connectionString.connection.host}`);
        // de_bugger(`Connected to database || DB HOST  :  ${connectionString.connection.host}`); // terminal export DEBUG=develoment:* (set debug) reset Debug clear DEBUG=
    } catch (error) {
       de_bugger("Mongo Db Connection error", error);
        process.exit(1);
    }
}

module.exports = connect;


