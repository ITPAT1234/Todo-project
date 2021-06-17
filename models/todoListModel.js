const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema({
    todoList: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model("todoList", todoListSchema);
