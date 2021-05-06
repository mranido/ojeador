"use strict";

const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  port: config.nodemailer.port,
  host: config.nodemailer.host,
  auth: {
    user: config.nodemailer.user,
    pass: config.nodemailer.password,
  },
  secure: false,
});

async function sendEmailRegistration(
  userName,
  userEmail,
  userVerificationCode,
  userid
) {
  const linkActivation = `${config.api.host}:${config.api.port}/api/v1/users/${userid}/activation?verification_code=${userVerificationCode}`;
  console.log(linkActivation);

  const mailMessage = {
    from: config.nodemailer.from,
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
    from: config.nodemailer.from,
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
