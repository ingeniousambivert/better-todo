const TodoModel = require("../models/todos");
const mongoose = require("mongoose");
const { decodeUserID } = require("../auth");

async function createTodo(req, res) {
  const data = req.body;
  try {
    const newTodo = new TodoModel(data);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("serverError");
  }
}

async function getTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    const { author } = Todo;
    const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
    if (decodedID === String(author)) {
      if (Todo) {
        return res.status(200).json(Todo);
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("serverError");
  }
}

async function getAllTodos(req, res) {
  try {
    const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
    const userID = mongoose.Types.ObjectId(decodedID);
    const Todos = await TodoModel.aggregate([
      { $match: { author: { $eq: userID } } },
      { $sort: { createdAt: -1 } },
    ]);
    if (Todos) {
      return res.status(200).json(Todos);
    } else {
      return res.status(404).json({ error: "Todos not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("serverError");
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    const { author } = Todo;
    const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
    if (decodedID === String(author)) {
      if (Todo) {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res.status(200).json(updatedTodo);
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("serverError");
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    const { author } = Todo;
    const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
    if (decodedID === String(author)) {
      if (Todo) {
        await TodoModel.findByIdAndDelete(id);
        return res.status(200).json("Todo Deleted");
      } else {
        return res.status(404).json({ error: "Todo not found" });
      }
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("serverError");
  }
}

module.exports = {
  createTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
