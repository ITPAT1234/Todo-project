const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema({
    todoContent: [
        {
            content: String,
            status: Boolean,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

module.exports = mongoose.model("todoList", todoListSchema);
