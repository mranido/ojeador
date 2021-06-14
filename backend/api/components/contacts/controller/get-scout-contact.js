"use strict";

const model = require("../../../infrastructure/mock-db");
const TABLE = "contacts";
const response = require("../../../routes/response");

async function getScoutContact(req, res, next) {
  try {
    let { userId, userRol } = req.auth;
    userId = req.params.id;
    const contactScoutId = userId;

    const scoutContacts = await model.findAllWithCondition(
      { contactScoutId: contactScoutId },
      TABLE
    );

    response.success(req, res, scoutContacts, 201);
  } catch (error) {
    next(error);
  }
}
module.exports = getScoutContact;
