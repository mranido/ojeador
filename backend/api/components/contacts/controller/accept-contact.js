"use strict";

const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const { sendEmailScoutContactAcept } = require("../../../helpers/mail-smtp");
const TABLE = "contacts";
const TABLE2 = "users";

async function acceptContact(req, res, next) {
  try {
    let { userId, userRol } = req.auth;
    let { id, contactid } = req.params;
    let contactId = contactid;
    let contactPlayerId = id;
    contactPlayerId = userId;

    const contact = await model.findOne({ contactId }, TABLE);

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
    const { contactScoutId } = contact;

    const dataEmail = await model.findOne({ userId: contactScoutId }, TABLE2);

    const { userName, userEmail } = dataEmail;
    console.log(userEmail);

    await sendEmailScoutContactAcept(userName, userEmail);

    response.success(req, res, acceptedContact, 201);
  } catch (error) {
    next(error);
  }
}
module.exports = acceptContact;
