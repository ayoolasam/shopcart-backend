const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailoPtions = {
    from: "obayomisamuel941@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailoPtions);
};

module.exports = sendEmail;