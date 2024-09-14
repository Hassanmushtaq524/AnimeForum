// PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

// CONTROLLERS
const { register } = require("./controllers/auth.js");
const fetchuser = require("./middleware/fetchuser.js");
const { createPost } = require("./controllers/posts.js");

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" } ));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

// ROUTES WITH FILES 
app.post("/api/auth/register", upload.single("picture"), register);
app.post("/api/posts/", fetchuser, upload.single("picture"), createPost);

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/users"));

// connect to mongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    const port = process.env.PORT || 6001;

    // connect if successful
    app.listen( port , () => {
        console.log(`listening on port ${port}...`);
    })

}).catch((err) => {
    // log error
    console.log(`${err}`);
});




