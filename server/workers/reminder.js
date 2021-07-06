const { Worker } = require("bullmq");
const reminderProcessor = require("../processor/reminder");

const reminderWorker = new Worker("reminders", reminderProcessor, {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

module.exports = reminderWorker;
