const reminderWorker = require("./workers/reminder");
const logger = require("./utils/logger");

reminderWorker.on("worker created", (name) => {
  console.log("worker created", name);
  console.log(reminderWorker.workers[name]);
});

reminderWorker.on("worker deleted", (name) => {
  console.log("worker deleted", name);
  console.log(typeof reminderWorker.workers[name] === "undefined");
});

console.log("Started workers");
