"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

const createJsonError = require("../../errors/create-json-error");
const {
  sendEmailPlayerRegistration,
  sendEmailScoutRegistration,
} = require("../../helpers/mail-smtp");
const {
  addPlayer,
  getPlayerByEmail,
  addScout,
  getScoutByEmail,
} = require("../../repositories/users-respository");

const schemaPlayer = Joi.object({
  playerName: Joi.string().min(1).max(240).required(),
  playerEmail: Joi.string().email().required(),
  playerPassword: Joi.string().min(4).max(8).required(),
  playerRepeatPassword: Joi.ref("playerPassword"),
});

const schemaScout = Joi.object({
  scoutName: Joi.string().min(1).max(240).required(),
  scoutEmail: Joi.string().email().required(),
  scoutPassword: Joi.string().min(4).max(8).required(),
  scoutRepeatPassword: Joi.ref("scoutPassword"),
});

async function registerPlayer(req, res) {
  try {
    const { body } = req;
    await schemaPlayer.validateAsync(body);
    const { playerName, playerEmail, playerPassword, scoutEmail } = body;
    console.log(playerName);
    const player = await getPlayerByEmail(playerEmail);
    console.log("player", player);
    if (player) {
      const error = new Error("Ya existe un usario registrado con ese email!");
      error.status = 409; // 400 tb es correcto
      throw error;
    }

    const passwordHash = await bcrypt.hash(playerPassword, 10);
    const playerVerificationCode = await cryptoRandomString({ length: 64 });
    const playerDB = {
      playerName,
      playerEmail,
      passwordHash,
      playerVerificationCode,
    };
    console.log(playerDB);
    const playerId = await addPlayer(playerDB);

    await sendEmailPlayerRegistration(
      playerName,
      playerEmail,
      playerVerificationCode
    );

    res.status(200);
    res.send({ playerId });
  } catch (error) {
    createJsonError(error, res);
  }
}

async function registerScout(req, res) {
  try {
    const { body } = req;
    await schemaScout.validateAsync(body);
    const { scoutName, scoutEmail, scoutPassword } = body;
    const scout = await getScoutByEmail(scoutEmail);
    console.log("scout", scout);
    if (scout) {
      const error = new Error("Ya existe un usario registrado con ese email!");
      error.status = 409; // 400 tb es correcto
      throw error;
    }

    const passwordHash = await bcrypt.hash(scoutPassword, 10);
    const scoutVerificationCode = await cryptoRandomString({ length: 64 });
    const scoutDB = {
      scoutName,
      scoutEmail,
      passwordHash,
      scoutVerificationCode,
    };
    console.log(scoutDB);
    const scoutId = await addScout(scoutDB);

    await sendEmailScoutRegistration(
      scoutName,
      scoutEmail,
      scoutVerificationCode
    );

    res.status(200);
    res.send({ scoutId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { registerPlayer, registerScout };
