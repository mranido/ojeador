"use strict";
const createJsonError = require("../../errors/create-json-error");
const {
  activateValidationPlayer,
  getPlayerByVerificationCode,
  activateValidationScout,
  getScoutByVerificationCode,
} = require("../../repositories/users-respository");
const {
  sendEmailPlayerCorrectValidation,
  sendEmailScoutCorrectValidation,
} = require("../../helpers/mail-smtp");

async function activatePlayer(req, res) {
  try {
    const { verification_code: playerVerificationCode } = req.query;

    if (!playerVerificationCode) {
      return res.status(400).json({
        message: "invalid verification code",
      });
    }

    const isActivated = await activateValidationPlayer(playerVerificationCode);

    if (!isActivated) {
      res.send({
        message: "Account not activated, verification code expired.",
      });
    }

    const player = await getPlayerByVerificationCode(playerVerificationCode);
    const { playerName, playerEmail } = player;
    await sendEmailPlayerCorrectValidation(playerName, playerEmail);

    res.send({ message: "account activated" });
  } catch (error) {
    createJsonError(error, res);
  }
}

async function activateScout(req, res) {
  try {
    const { verification_code: scoutVerificationCode } = req.query;

    if (!scoutVerificationCode) {
      return res.status(400).json({
        message: "invalid verification code",
      });
    }

    const isActivated = await activateValidationScout(scoutVerificationCode);
    console.log(isActivated);
    if (!isActivated) {
      res.send({
        message: "Account not activated, verification code expired.",
      });
    }

    const scout = await getScoutByVerificationCode(scoutVerificationCode);
    const { scoutName, scoutEmail } = scout;
    await sendEmailScoutCorrectValidation(scoutName, scoutEmail);

    res.send({ message: "account activated" });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { activatePlayer, activateScout };
