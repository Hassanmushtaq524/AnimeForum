const express = require("express")
const app = express();

const connectToMongo = require("./db");
const cors = require("cors");
connectToMongo();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.listen(5000, () => {
    console.log("listening on port 5000...")
})