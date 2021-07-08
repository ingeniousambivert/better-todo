const Bree = require("bree");
const logger = require("../utils/logger");

const reminderWorker = new Bree({
  workerMetadata: true,
  jobs: [
    {
      name: "reminder",
      // using human-intervals
      timeout: "1m",
      interval: "5m",
    },
  ],
  errorHandler: (error, workerMetadata) => {
    if (workerMetadata.threadId) {
      logger.info(
        `There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`
      );
    } else {
      logger.info(
        `There was an error while running a worker ${workerMetadata.name}`
      );
    }
    logger.error(error);
  },
});

module.exports = reminderWorker;
