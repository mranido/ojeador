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

async function sendEmailPlayerRegistration(
  playerName,
  playerEmail,
  playerVerificationCode
) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation/player?verification_code=${playerVerificationCode}`;
  console.log(linkActivation);

  const mailMessage = {
    from: SMTP_FROM,
    to: playerEmail,
    subject: "Bienvenido a Ojeador",
    text: `Hola ${playerName}, To confirm the account activate it here: ${linkActivation}`,
    html: `Hola ${playerName}, To confirm the account <a href="${linkActivation}">activate it here</a>`,
  };
  console.log("mailMessage", mailMessage);
  const data = await transporter.sendMail(mailMessage);

  return data;
}

async function sendEmailPlayerCorrectValidation(playerName, playerEmail) {
  const mailMessage = {
    from: SMTP_FROM,
    to: playerEmail,
    subject: "[Ojeador] Cuenta Activada!",
    text: `Hi ${playerName},\n Your account was be activated. Enjoy our apps`,
    html: `<p>Hi ${playerName},</p><p>Your account was be activated. Enjoy our app!</p>`,
  };

  const data = await transporter.sendMail(mailMessage);

  return data;
}

async function sendEmailScoutRegistration(
  scoutName,
  scoutEmail,
  scoutVerificationCode
) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation/scout?verification_code=${scoutVerificationCode}`;

  const mailMessage = {
    from: SMTP_FROM,
    to: scoutEmail,
    subject: "Bienvenido a Ojeador",
    text: `Hola ${scoutName}, To confirm the account activate it here: ${linkActivation}`,
    html: `Hola ${scoutName}, To confirm the account <a href="${linkActivation}">activate it here</a>`,
  };
  console.log("mailMessage", mailMessage);
  const data = await transporter.sendMail(mailMessage);

  return data;
}

async function sendEmailScoutCorrectValidation(scoutName, scoutEmail) {
  const mailMessage = {
    from: SMTP_FROM,
    to: scoutEmail,
    subject: "[Ojeador] Cuenta Activada!",
    text: `Hi ${scoutName},\n Your account was be activated. Enjoy our apps`,
    html: `<p>Hi ${scoutName},</p><p>Your account was be activated. Enjoy our app!</p>`,
  };

  const data = await transporter.sendMail(mailMessage);

  return data;
}

module.exports = {
  sendEmailPlayerRegistration,
  sendEmailPlayerCorrectValidation,
  sendEmailScoutCorrectValidation,
  sendEmailScoutRegistration,
};
