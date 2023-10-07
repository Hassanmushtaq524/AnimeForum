const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/AnimeForum";

const connectToMongo = () => {
    // connect to mongo database
    mongoose.connect(mongoURI);
}

module.exports = connectToMongo;