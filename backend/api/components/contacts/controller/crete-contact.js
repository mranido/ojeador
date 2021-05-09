"use strict";
const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const { sendEmailContact } = require("../../../helpers/mail-smtp");
const TABLE = "contacts";
const TABLE2 = "users";

async function createContact(req, res, next) {
  try {
    const { id } = req.params;
    const userId = Number(id);

    await schema.create.validateAsync(req.body);
    const { contactScoutId, contactPlayerId, contactDescription } = req.body;

    const player = await model.findOne({ userId }, TABLE2);
    if (!player) {
      return response.error(req, res, "Persona no existe", 400);
    }
    const { userEmail, userName } = player;

    const contactDB = {
      contactScoutId,
      contactPlayerId: userId,
      contactDescription,
    };

    const createAComment = await model.create(contactDB, TABLE);

    await sendEmailContact(userName, userEmail);

    response.success(req, res, "mensaje creado", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = createContact;
