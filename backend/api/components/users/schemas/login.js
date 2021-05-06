'use strict';
const Joi = require('joi');

const schemalogin = Joi.object({
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().min(4).max(20).required(),
});

module.exports = schemalogin;

