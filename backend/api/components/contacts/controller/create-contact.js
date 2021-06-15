"use strict";
const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const { sendEmailContact } = require("../../../helpers/mail-smtp");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const { decodedToken } = require("../../../middlewares/accessAuth");
const TABLE = "contacts";
const TABLE2 = "users";

async function createContact(req, res, next) {
  try {
    const { userId } = req.auth;
    const contactScoutId = userId;
    const contactPlayerId = req.params.id;

    await schema.create.validateAsync(req.body);
    const { contactDescription, contactTitle } = req.body;

    const player = await model.findOne({ userId: contactPlayerId }, TABLE2);
    if (!player) {
      return response.error(req, res, "Persona no existe", 400);
    }

    const { userEmail, userName, userRol } = player;

    if (userRol !== "Player") {
      return response.error(
        req,
        res,
        "Sólo se pueden enviar mensajes a los jugadores",
        400
      );
    }

    const contactDB = {
      contactScoutId,
      contactPlayerId,
      contactTitle,
      contactDescription,
    };

    const createAComment = await model.create(contactDB, TABLE);

    await sendEmailContact(userName, userEmail);

    res.send(contactDB).status(201);
  } catch (error) {
    next(error);
  }
}

module.exports = createContact;
