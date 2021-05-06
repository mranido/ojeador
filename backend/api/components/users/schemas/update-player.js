'use strict';
const Joi = require("joi");

const updatePlayer = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  location: Joi.string().max(60),
  team: Joi.string().min(5).max(100),
  number: Joi.number().min(1).max(99).positive(),
  image: Joi.string().max(255),
  birthday: Joi.date(),
  description: Joi.string().max(500),
});



module.exports = updatePlayer;
