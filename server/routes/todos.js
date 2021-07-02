const express = require("express");
const { secureRoute } = require("../auth");
const {
  createTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");

const router = express.Router();

router.get("/", secureRoute, getAllTodos);

router.post("/", secureRoute, createTodo);

router.get("/:id", secureRoute, getTodo);

router.patch("/:id", secureRoute, updateTodo);

router.delete("/:id", secureRoute, deleteTodo);

module.exports = router;
