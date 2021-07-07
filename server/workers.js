const { QueueScheduler } = require("bullmq");
const reminderWorker = require("./workers/reminder");
const logger = require("./utils/logger");

const remindersQueueScheduler = new QueueScheduler("reminders", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

remindersQueueScheduler.on("failed", (error) => {
  logger.error("Failed processing reminders job", error);
});

reminderWorker.on("error", (error) => {
  logger.error("Worker Error", error);
});

reminderWorker.on("completed", (job, returnvalue) => {
  logger.info(`Completed job ${job.id} successfully`);
});

reminderWorker.on("failed", (job, failedReason) => {
  logger.error(`Job ${job.id} failed. ${failedReason}`);
});

console.log(`Started workers: ${reminderWorker.name}`);
