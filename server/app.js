const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const requestLogger = require("morgan");
const logger = require("./utils/logger");

const { createBullBoard } = require("bull-board");
const { BullMQAdapter } = require("bull-board/bullMQAdapter");

require("./config/mongoose");

const { remindersQueue } = require("./queues/reminder");
const reminderWorker = require("./workers/reminder");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");

const app = express();

const { router } = createBullBoard([new BullMQAdapter(remindersQueue)]);

app.use("/admin/queues", router);

reminderWorker.on("error", (error) => {
  logger.error(error);
});

reminderWorker.on("completed", (job, returnvalue) => {
  console.log(returnvalue);
  logger.info(`Completed job ${job.id} successfully`);
});

reminderWorker.on("failed", (job, failedReason) => {
  logger.error(`Job ${job.id} failed. ${failedReason}`);
});

app.use(requestLogger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

module.exports = app;
