"use strict";

const nodemailer = require("nodemailer");

const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});

async function sendEmailRegistration(
  userName,
  userEmail,
  userVerificationCode
) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?verification_code=${userVerificationCode}`;
  console.log(linkActivation);

  const mailMessage = {
    from: SMTP_FROM,
    to: userEmail,
    subject: "Bienvenido a Ojeador",
    text: `Hola ${userName}, To confirm the account activate it here: ${linkActivation}`,
    html: `Hola ${userName}, To confirm the account <a href="${linkActivation}">activate it here</a>`,
  };
  console.log("mailMessage", mailMessage);
  const data = await transporter.sendMail(mailMessage);

  return data;
}

async function sendEmailCorrectValidation(userName, userEmail) {
  const mailMessage = {
    from: SMTP_FROM,
    to: userEmail,
    subject: "[Ojeador] Cuenta Activada!",
    text: `Hi ${userName},\n Your account was be activated. Enjoy our apps`,
    html: `<p>Hi ${userName},</p><p>Your account was be activated. Enjoy our app!</p>`,
  };

  const data = await transporter.sendMail(mailMessage);

  return data;
}

module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
};
