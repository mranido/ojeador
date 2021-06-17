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
    text: `¡Hola ${userName}!
    Para confirmar tu cuenta haz click aquí ${linkActivation}`,
    html: `¡Hola ${userName}! Para confirmar tu cuenta <a href="${linkActivation}">haz click aquí.</a>`,
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
async function sendEmailContact(userName, userEmail, id) {
  const mailMessage = {
    from: config.nodemailer.from,
    to: userEmail,
    subject: "[Ojeador]Tienes una nueva oferta",
    text: `Hola ${userName},\n, Tienes una nueva oferta , puedes consultarlo desde <a href ="http://localhost:8000/contact/user/${id}">aquí`,
    html: `<p>Hi ${userName}\n,<p>Tienes una nueva oferta, puedes consultarla desde <a href="http://localhost:8000/contact/user/${id}">aquí</a></p>`,
  };

  const data = await transporter.sendMail(mailMessage);

  return data;
}

module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
  sendEmailContact,
};
