"use strict";
const createJsonError = require("../../../errors/create-json-error");
const {
  activateValidation,
  getUserByVerificationCode,
} = require("../../../repositories/users-respository");
const { sendEmailCorrectValidation } = require("../../../helpers/mail-smtp");

async function activateUser(req, res) {
  try {
    const { verification_code: userVerificationCode } = req.query;

    if (!userVerificationCode) {
      return res.status(400).json({
        message: "invalid verification code",
      });
    }

    const isActivated = await activateValidation(userVerificationCode);

    if (!isActivated) {
      res.send({
        message: "Account not activated, verification code expired.",
      });
    }

    const user = await getUserByVerificationCode(userVerificationCode);
    const { userName, userEmail } = user;
    await sendEmailCorrectValidation(userName, userEmail);

    res.send({ message: "account activated" });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = activateUser;
