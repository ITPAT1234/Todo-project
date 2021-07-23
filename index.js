const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const path = require("path");

const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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

// Running Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
