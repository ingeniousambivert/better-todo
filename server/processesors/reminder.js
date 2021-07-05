const logger = require("../utils/logger");
const { clientUrl } = require("../config");
const { createReminderMail, mailTransporter } = require("../utils");

async function reminderWorker(job) {
  job.updateProgress(10);
  const { data } = job;
  const { email, id } = data;
  job.updateProgress(20);
  const mailOptions = createReminderMail(email, id, clientUrl);
  job.updateProgress(40);

  mailTransporter.sendMail(mailOptions, async function (error) {
    job.updateProgress(60);
    if (error) {
      logger.error(error.message);
      throw new Error(error.message);
    } else {
      job.updateProgress(80);
      job.updateProgress(100);
    }
  });

  return {
    status: "Success",
    message: `Sent a Todo reminder for Todo ID: ${id} to User Email: ${email}`,
  };
}

module.exports = reminderWorker;
