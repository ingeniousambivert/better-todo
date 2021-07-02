const TodoModel = require("../models/todos");
const fieldsToExclude = {
  password: 0,
  verifyToken: 0,
  verifyExpires: 0,
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
};

async function createTodo(req, res) {
  const data = req.body;
  try {
    const newTodo = new TodoModel(data);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function getTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id).populate(
      "author",
      fieldsToExclude
    );
    if (Todo) {
      return res.status(200).json(Todo);
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function getAllTodos(req, res) {
  try {
    const Todos = await TodoModel.find()
      .populate("author", fieldsToExclude)
      .sort({ createdAt: -1 });
    if (Todos) {
      return res.status(200).json(Todos);
    } else {
      return res.status(404).json({ error: "Todos not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    if (Todo) {
      const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedTodo);
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    if (Todo) {
      await TodoModel.findByIdAndDelete(id);
      return res.status(200).json("Todo Deleted");
    } else {
      return res.status(400).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

module.exports = {
  createTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
