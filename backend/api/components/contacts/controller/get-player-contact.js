"use strict";

const model = require("../../../infrastructure/mock-db");
const TABLE = "contacts";
const response = require("../../../routes/response");

async function getPlayerContact(req, res, next) {
  try {
    let { userId, userRole } = req.auth;
    userId = req.params.id;
    const contactPlayerId = userId;

    const playerContacts = await model.findAllWithCondition(
      { contactPlayerId: contactPlayerId },
      TABLE
    );

    response.success(req, res, playerContacts, 201);
  } catch (error) {
    next(error);
  }
}
module.exports = getPlayerContact;
