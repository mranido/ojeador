"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

const createJsonError = require("../../../errors/create-json-error");
const { sendEmailRegistration } = require("../../../helpers/mail-smtp");
const {
  addUser,
  getUserByEmail,
} = require("../../../repositories/users-respository");

const schema = Joi.object({
  userName: Joi.string().min(1).max(240).required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().min(4).max(8).required(),
  userRepeatPassword: Joi.ref("userPassword"),
  userRol: Joi.valid("Player", "Scout"),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { userName, userEmail, userPassword, userRol } = body;

    const user = await getUserByEmail(userEmail);
    if (user) {
      const error = new Error("Ya existe un usario registrado con ese email!");
      error.status = 409; // 400 tb es correcto
      throw error;
    }
    const passwordHash = await bcrypt.hash(userPassword, 10);
    const userVerificationCode = await cryptoRandomString({ length: 64 });
    const userDB = {
      userName,
      userEmail,
      passwordHash,
      userVerificationCode,
      userRol,
    };
    console.log(userDB);
    const userId = await addUser(userDB);

    await sendEmailRegistration(userName, userEmail, userVerificationCode);

    res.status(200);
    res.send({ userId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
