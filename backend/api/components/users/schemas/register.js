'use strict';
const Joi = require("joi");

const register = Joi.object({
  userName: Joi.string().min(1).max(240).required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().min(4).max(8).required(),
  userRepeatPassword: Joi.ref("userPassword"),
  userRol: Joi.valid("Player", "Scout"),
});


module.exports = register;
