"use strict";

const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const validateAuth = require("../../../middlewares/validate-auth");
const { jwt } = require("../../../config");
const schema = require("../schemas");
const TABLE = "users";

async function updatePlayer(req, res, next) {
  try {
    //const { userEmail } = req.auth;
    const { id } = req.params;
    const userId = Number(id);

    const { body: userDataUpdated } = req;
    await schema.update.validateAsync(userDataUpdated);

    const userExists = await model.findOne({ userId }, TABLE);
    if (!userExists) {
      return response.error(req, res, "El usuario no existe", 404);
    }

    if (userExists.userId === userId) {
      await model.update(userDataUpdated, TABLE, userId);
    } else {
      return response.error(req, res, "tu madre", 403);
    }

    response.success(req, res, "Soy el puto amo", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = updatePlayer;
