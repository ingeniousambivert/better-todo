const Bull = require("bull");
const reminderWorker = require("../workers/reminder");

const remindersQueue = new Bull("reminders", {
  redis: { port: 6379, host: "127.0.0.1" },
});

remindersQueue.process("reminder", reminderWorker);

const setReminder = (data) => {
  const { email, id, delay, repeat } = data;

  remindersQueue.add(
    "reminder",
    { email, id },
    {
      delay: delay,
      repeat: { every: repeat },
    }
  );
};

module.exports = { setReminder, remindersQueue };
