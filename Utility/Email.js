const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
  const transport = nodeMailer.createTransport({
    host: process.env.host,
    port: process.env.port,
    auth: {
      user: process.env.emailUsername,
      pass: process.env.emailPassword,
    },
  });
  const emailOption = {
    from: "Ibukunoluwa oyetunjiIbukunoluwa8@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transport.sendMail(emailOption);
};
module.exports = sendMail;
