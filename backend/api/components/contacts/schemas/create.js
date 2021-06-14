"use strict";
const Joi = require("joi");

const schemaCreate = Joi.object().keys({
  contactScoutId: Joi.number().positive(),
  contactPayerId: Joi.number().positive(),
  contactTitle: Joi.string().min(5).max(50).required(),
  contactDescription: Joi.string().min(5).max(255).required(),
});

module.exports = schemaCreate;
