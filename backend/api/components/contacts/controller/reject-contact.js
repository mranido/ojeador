"use strict";

const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const TABLE = "contacts";

async function rejectContact(req, res, next) {
  try {
    const { id, contactid } = req.params;
    const rejectedContact = await model.delete(
      { contactId: contactid }, TABLE
    );

    response.success(req, res, "Oferta Rechazada y Eliminada", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = rejectContact;
