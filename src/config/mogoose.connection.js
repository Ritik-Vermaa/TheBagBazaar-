const mongoose = require('mongoose');
const DB_NAME  = require('../utils/constants');

const connect = async () => {
    try {
        const connectionString = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Connected to database || DB HOST  :  ${connectionString.connection.host}`);
    } catch (error) {
        console.log("Mongo Db Connection error", error);
        process.exit(1);
    }
}

module.exports = connect;


