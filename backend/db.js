// PACKAGES
const mongoose = require("mongoose");


const connectToMongo = () => {
    // connect to mongo database
    mongoose.connect(process.env.MONGO_URL).catch((err) => {
        console.log("Error connecting to MongoDB");
    });
}

module.exports = connectToMongo;