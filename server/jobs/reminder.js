require("../config/mongoose");
const logger = require("../utils/logger");
const { clientUrl } = require("../config");
const TodoModel = require("../models/todos");
const { createReminderMail, mailTransporter } = require("../utils");

async function reminderJob(job) {
  const { data } = job;
  const { email, id } = data;

  const Todo = await TodoModel.findById(id);

  if (Todo) {
    const { reminder } = Todo;
    if (reminder !== 0) {
      job.updateProgress(10);
      const mailOptions = createReminderMail(email, id, clientUrl);

      mailTransporter.sendMail(mailOptions, async function (error) {
        job.updateProgress(50);
        if (error) {
          logger.error(error.message);
          throw new Error(error.message);
        }
        job.updateProgress(100);
      });
      await TodoModel.findByIdAndUpdate(id, { jobId: job.id });

      return {
        status: "Success",
        message: `Sent a Todo reminder for Todo ID: ${id} to User Email: ${email}`,
      };
    } else {
      return {
        status: "Success",
        message: `No reminder set for Todo ID: ${id}`,
      };
    }
  } else {
    throw new Error(`Todo ID: ${id} does not exist`);
  }
}

module.exports = reminderJob;
