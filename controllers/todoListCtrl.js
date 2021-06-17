const todoList = require("../models/todoListModel");
const user = require("../models/userModel");

const todoListCtrl = {
    addTodo: async (req, res) => {
        try {
            const User = await user.findById(req.user.id);
            console.log(User);
            const { todo } = req.body;

            await user.findByIdAndUpdate(
                { _id: User._id },
                {
                    $push: {
                        todoList: todo,
                    },
                }
            );
            res.json({ msg: "Add Todo " });
        } catch (err) {
            res.json({ msg: err.message });
        }
    },
};

module.exports = todoListCtrl;
