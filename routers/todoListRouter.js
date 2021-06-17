const router = require("express").Router();
const todoCtrl = require("../controllers/todoListCtrl");
const auth = require("../middleware/auth");

router.post("/addTodo", auth, todoCtrl.addTodo);

module.exports = router;
