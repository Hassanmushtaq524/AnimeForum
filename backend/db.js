const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/AnimeForum";

const connectToMongo = () => {
    // connect to mongo database
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;