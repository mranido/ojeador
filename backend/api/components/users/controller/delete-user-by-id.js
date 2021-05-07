"use strict";

const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";
const response = require("../../../routes/response");

async function deleteUserById(req, res, next) {
  try {
    const { id: userId } = req.params;
    await schema.remove.validateAsync(userId);

    const user = await model.findOne({ userId }, TABLE);
    console.log("--> user", user);
    if (!user) {
      return response.error(req, res, "Usuario erróneo", 409);
    }

    await model.delete({ userId }, TABLE);

    response.success(req, res, "usuario borrado correctamente", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = deleteUserById;
