const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: "String",
        trim: true,
        unique: true,
        require: true,
    },
    password: {
        type: "String",
        unique: true,
        require: true,
    },
});

module.exports = mongoose.model("user", userSchema);
