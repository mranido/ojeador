"use strict";
const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const responses = require("../../../routes/responses");
const { sendEmailContact } = require("../../../helpers/mail-smtp");
const TABLE = "contacts";
const TABLE2 = "users";

async function createContact(req, res, next) {
  try {
    const { id } = req.params;

    await schema.create.validateAsync(req.body);
    const { contactScoutId, contactPlayerId, contactDescription } = req.body;

    const player = await model.findOne({ id }, TABLE2);
    if (!player) {
      return responses.error(req, res, "Persona no existe", 400);
    }
    const { userEmail, userName } = player;

    const contactDB = {
      contactScoutId,
      contactPlayerId: id,
      contactDescription,
    };

    const createAComment = await model.create(contactDB, TABLE);

    await sendEmailContact(userName, userEmail);

    responses.success(req, res, "mensaje creado", 201);
  } catch (error) {
    next(error);
  }
}


module.exports = createContact;
