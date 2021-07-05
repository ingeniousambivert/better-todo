const { Queue, QueueScheduler } = require("bullmq");

const remindersQueueScheduler = new QueueScheduler("reminders");
const remindersQueue = new Queue("reminders", {
  concurrency: 1,
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

const setReminder = async (data) => {
  const { email, id, delay, repeat } = data;

  await remindersQueue.add(
    "reminder",
    { email, id },
    {
      delay: delay,
      repeat: { every: repeat },
    }
  );
};

module.exports = { setReminder, remindersQueue };
