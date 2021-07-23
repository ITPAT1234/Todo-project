const router = require("express").Router();
const todoCtrl = require("../controllers/todoListCtrl");
const auth = require("../middleware/auth");

router.post("/addTodo", auth, todoCtrl.addTodo);
router.post("/getTodo", todoCtrl.getTodo);
router.post("/deleteTodo", todoCtrl.deleteTodo);
router.post("/doneTodo", todoCtrl.doneTodo);

module.exports = router;
