const { Worker } = require("bullmq");
const reminderProccessor = require("../processesors/reminder");

const reminderWorker = new Worker("reminders", reminderProccessor, {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

module.exports = reminderWorker;
