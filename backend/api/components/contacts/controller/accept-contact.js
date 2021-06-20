"use strict";

const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const TABLE = "contacts";

async function acceptContact(req, res, next) {
  try {
    let { userId, userRol } = req.auth;
    let { id, contactid } = req.params;
    let contactId = contactid;
    let contactPlayerId = id;
    contactPlayerId = userId;

    const contact = await model.findOne({ contactId }, TABLE);
    console.log(contact.contactStatus);

    if (Number(contact.contactStatus) === 1) {
      return response.error(req, res, "Ya has aceptado la oferta", 409);
    }

    const acceptedContact = await model.update1(
      { contactStatus: true },
      TABLE,
      {
        contactId: contactid,
      }
    );

    response.success(req, res, acceptedContact, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = acceptContact;
