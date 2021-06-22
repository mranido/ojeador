"use strict";

const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const TABLE = "contacts";

async function rejectContact(req, res, next) {
  try {
    let { userId, userRol } = req.auth;
    let { id, contactid } = req.params;
    let contactId = contactid;
    let contactPlayerId = id;
    contactPlayerId = userId;

    const contact = await model.findOne({ contactId }, TABLE);
    console.log(contact.contactStatus);

    if (Number(contact.contactStatus) === 2) {
      return response.error(req, res, "Ya has rechazado la oferta", 409);
    }

<<<<<<< HEAD
    const rejectedContact = await model.update1({ contactStatus: 2 }, TABLE, {
      contactId: contactid,
    });
=======
    const rejectedContact = await model.update1(
      { contactStatus: false },
      TABLE,
      {
        contactId: contactid,
      }
    );
>>>>>>> 58b4f791a9850d629355e0652d63504754252ff7

    response.success(req, res, rejectedContact, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = rejectContact;
