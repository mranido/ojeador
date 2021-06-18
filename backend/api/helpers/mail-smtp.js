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
    subject: "Ojeador Bienvenid@",
    text: `¡Hola ${userName}!\n Para confirmar tu cuenta haz click aquí ${linkActivation}`,
    html: `¡Hola ${userName}! Para confirmar tu cuenta haz click <a href="${linkActivation}">aquí</a>.`,
  };
  console.log("mailMessage", mailMessage);
  const data = await transporter.sendMail(mailMessage);

  return data;
}

async function sendEmailCorrectValidation(userName, userEmail) {
  const mailMessage = {
    from: config.nodemailer.from,
    to: userEmail,
    subject: "Ojeador Cuenta Activada!",
    text: `Hola ${userName},\n Tu cuenta está activada.\n Haz click <a href ="http://localhost:3000/login/">aquí</a> para loguearte.\n¡Que disfrutes de Ojeador!`,
    html: `<p>Hola ${userName},</p><p>Tu cuenta está activada.<p>Haz click <a href ="http://localhost:3000/login/">aquí</a> para loguearte.</p> ¡Que disfrutes de Ojeador!</p>`,
  };

  const data = await transporter.sendMail(mailMessage);

  return data;
}
async function sendEmailContact(userName, userEmail, id) {
  const mailMessage = {
    from: config.nodemailer.from,
    to: userEmail,
    subject: "Ojeador Tienes una nueva oferta",
    text: `Hola ${userName},\n tienes una nueva oferta, entra en la aplicación y visualizala.\n Ojalá que sea de tu agrado. Haz click <a href ="http://localhost:3000/login/">aquí</a> para loguearte y ver la oferta`,
    html: `Hola ${userName}, tienes una nueva oferta, entra en la aplicación y visualizala. <p>Ojalá que sea de tu agrado. Haz click <a href ="http://localhost:3000/login/">aquí</a> para loguearte y ver la oferta</p>`,
  };

  const data = await transporter.sendMail(mailMessage);

  return data;
}

module.exports = {
  sendEmailRegistration,
  sendEmailCorrectValidation,
  sendEmailContact,
};
