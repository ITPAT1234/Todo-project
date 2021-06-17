const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers
app.use("/user", require("./routers/userRouter"));
app.use("/todo", require("./routers/todoListRouter"));

// connect mongoDB
mongoose.connect(
    keys.mongoURI,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connect to MongoDB");
    }
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

app.get("/", (req, res) => {
    res.send({ msg: "HI" });
});

// Running Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
