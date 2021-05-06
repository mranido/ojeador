"use strict";

const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const { sendEmailRegistration } = require("../../../helpers/mail-smtp");
const schema = require("../schemas");
const TABLE = "users";

async function registerUser(req, res, next) {
  try {
    console.log(req.body);
    await schema.register.validateAsync(req.body);
    const { userName, userEmail, userPassword, userRol } = req.body;

    const emailExists = await model.findOne({ userEmail }, TABLE);
    if (emailExists) {
      response.error(req, res, "Ya existe un usuario", 409);
    }

    const userVerificationCode = cryptoRandomString({ length: 64 });
    const userDB = {
      userName,
      userEmail,
      userPassword: await bcrypt.hash(userPassword, 10),
      userVerificationCode,
      userRol,
    };

    const newUser = await model.create(userDB, TABLE);

    const findId = await model.findOne({ userEmail }, TABLE);

    const { userId } = findId;

    console.log("VAMOOOOSSS", findId);

    await sendEmailRegistration(
      userName,
      userEmail,
      userVerificationCode,
      userId
    );

    response.success(req, res, "usuario creado", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = registerUser;
