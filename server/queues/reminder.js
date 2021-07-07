const { Queue } = require("bullmq");
const logger = require("../utils/logger");
const remindersQueue = new Queue("reminders", {
  concurrency: 1,
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
  limiter: {
    max: 1,
    duration: 1000,
  },
  attempts: 5,
  backoff: { type: "exponential", delay: 3000 },
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

const removeRepeatable = async (jobId) => {
  try {
    const jobs = await remindersQueue.getRepeatableJobs(0, -1, false);
    if (jobs.length > 0) {
      const repeatableJob = job.find((element) => {
        if (element !== null && element.id === jobId) {
          return element;
        }
        return {};
      });
      if (repeatableJob !== null && repeatableJob !== undefined) {
        await remindersQueue.removeRepeatableByKey(repeatableJob.key);
        return true;
      }
    }
  } catch (error) {
    logger.error(error.message);
    return false;
  }
};

module.exports = { setReminder, remindersQueue, removeRepeatable };
