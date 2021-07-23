const todoList = require("../models/todoListModel");

const todoListCtrl = {
    addTodo: async (req, res) => {
        try {
            const { addTodo, id } = req.body;
            const fecthTodo = await todoList.find({ user: id });

            if (fecthTodo.length === 0) {
                const newTodo = new todoList({
                    todoContent: [{ content: addTodo, status: false }],
                    user: id,
                });

                await newTodo.save();
            } else {
                await todoList.findByIdAndUpdate(
                    { _id: fecthTodo[0]._id },
                    {
                        $push: {
                            todoContent: [{ content: addTodo, status: false }],
                        },
                    }
                );
            }

            res.json({ msg: "Create Todo Success" });
        } catch (err) {
            res.json({ msg: err.message });
        }
    },
    deleteTodo: async (req, res) => {
        try {
            const { id, content } = req.body;
            await todoList.update(
                {},
                { $pull: { todoContent: { _id: id, content: content } } }
            );
            res.json({ msg: "Delete Success" });
        } catch (err) {
            res.json({ msg: err.message });
        }
    },
    doneTodo: async (req, res) => {
        try {
            const { id, content } = req.body;
            const findTodoContent = await todoList.findOne(
                {
                    todoContent: { $elemMatch: { _id: id, content: content } },
                },
                { "todoContent.$": 1, content: 1 }
            );
            const checkStatus = findTodoContent.todoContent[0].status;

            if (checkStatus) {
                await todoList.updateOne(
                    {
                        todoContent: {
                            $elemMatch: { _id: id, content: content },
                        },
                    },
                    {
                        $set: { "todoContent.$.status": false },
                    }
                );
            } else {
                await todoList.updateOne(
                    {
                        todoContent: {
                            $elemMatch: { _id: id, content: content },
                        },
                    },
                    {
                        $set: { "todoContent.$.status": true },
                    }
                );
            }
            res.json({ msg: "Success" });
        } catch (err) {
            res.json({ msg: err.message });
        }
    },
    getTodo: async (req, res) => {
        try {
            const { id } = req.body;
            const fecthTodo = await todoList
                .find({ user: id })
                .populate("user");
            res.json(fecthTodo);
        } catch (err) {
            res.json({ msg: err.message });
        }
    },
};

module.exports = todoListCtrl;
module.exports = todoListCtrl;
