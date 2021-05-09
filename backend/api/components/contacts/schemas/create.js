'use strict';
const Joi = require('joi');

const schemaCreate = Joi.object().keys({
  contactScoutId: Joi.number().positive().required(),
  contactPayerId: Joi.number().positive(),
  contactDescription: Joi.string().min(5).max(255).required()
});

module.exports = schemaCreate;