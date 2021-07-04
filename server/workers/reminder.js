const logger = require("../utils/logger");
const { clientUrl } = require("../config");
const { createReminderMail, mailTransporter } = require("../utils");

const reminderWorker = async (job, done) => {
  const { data } = job;
  const { email, id } = data;
  const mailOptions = createReminderMail(email, id, clientUrl);
  mailTransporter.sendMail(mailOptions, async function (error) {
    if (error) {
      logger.error(`${error.message}`);
      throw new Error(error.message);
    } else {
      done();
      return {
        status: "Success",
        message: `Sent a Todo reminder for Todo ID: ${id} to user with ${email}`,
      };
    }
  });
};

module.exports = reminderWorker;
