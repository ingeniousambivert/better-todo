const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const requestLogger = require("morgan");

const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");

require("./config/mongoose");

const { remindersQueue } = require("./queues/reminder");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");

const app = express();

const { router } = createBullBoard([new BullAdapter(remindersQueue)]);

app.use("/admin/queues", router);

app.use(requestLogger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

module.exports = app;
