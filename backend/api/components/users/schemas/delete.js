"use strict";
const Joi = require("joi");

const schemaId = Joi.number().positive();

module.exports = schemaId;
