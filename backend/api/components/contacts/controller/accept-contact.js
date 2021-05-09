"use strict";

const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const TABLE = "contacts";

async function acceptContact(req, res, next) {
  try {
    const { id, contactid } = req.params;
    const acceptedContact = await model.update1(
      { contactStatus: true },
      TABLE,
      { contactId: contactid }
    );

    response.success(req, res, "Oferta Aceptada", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = acceptContact;
