'use strict';
const Joi = require("joi");

const update = Joi.object({
  userName: Joi.string()
    .min(5)
    .max(255)
    .messages({ "string.name": "El campo userName es obligatorio" }),
  userEmail: Joi.string().email(),
  userPassword: Joi.string().min(4).max(20),
  userLocation: Joi.string().max(60),
  userTeam: Joi.string().min(5).max(100),
  userNumber: Joi.number().min(1).max(99).positive(),
  userImage: Joi.string().max(255),
  userBirthday: Joi.date(),
  userDescription: Joi.string().max(500),
});



module.exports = update;
