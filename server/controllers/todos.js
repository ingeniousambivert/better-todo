const mongoose = require("mongoose");
const logger = require("../utils/logger");
const { setReminder, remindersQueue } = require("../queues/reminder");
const TodoModel = require("../models/todos");
const UserModel = require("../models/users");
const { decodeUserID } = require("../auth");

async function createTodo(req, res) {
  const data = req.body;
  try {
    const newTodo = new TodoModel(data);
    await newTodo.save();
    const { _id, author, reminder } = newTodo;
    const authorData = await UserModel.findById(author);
    const { email } = authorData;

    if (reminder !== 0) {
      const delay = reminder * 60 * 1000;
      const repeat = reminder * 60 * 1000;
      await setReminder({ email, id: _id, delay, repeat });
    }

    res.status(201).json(newTodo);
  } catch (error) {
    logger.error(
      `${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(500).json({ error: error.message });
  }
}

async function getTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    if (Todo) {
      const { author } = Todo;
      const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
      if (decodedID === String(author)) {
        return res.status(200).json(Todo);
      } else {
        return res.status(403).json({ error: "Access denied" });
      }
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    logger.error(
      `${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(500).json({ error: error.message });
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
    logger.error(
      `${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(500).json({ error: error.message });
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    if (Todo) {
      const { author } = Todo;
      const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
      if (decodedID === String(author)) {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        const { reminder } = updatedTodo;
        const authorData = await UserModel.findById(author);
        const { email } = authorData;
        if (reminder) {
          await remindersQueue.removeRepeatable("reminder");
          if (reminder !== 0) {
            const delay = reminder * 60 * 1000;
            const repeat = reminder * 60 * 1000;
            await setReminder({ email, id, delay, repeat });
          }
        }
        return res.status(200).json(updatedTodo);
      } else {
        return res.status(403).json({ error: "Access denied" });
      }
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    logger.error(
      `${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(500).json({ error: error.message });
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const Todo = await TodoModel.findById(id);
    if (Todo) {
      const { author } = Todo;
      const decodedID = decodeUserID(req.headers.authorization.split(" ")[1]);
      if (decodedID === String(author)) {
        await TodoModel.findByIdAndDelete(id);
        return res.status(200).json("Todo Deleted");
      } else {
        return res.status(403).json({ error: "Access denied" });
      }
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    logger.error(
      `${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
