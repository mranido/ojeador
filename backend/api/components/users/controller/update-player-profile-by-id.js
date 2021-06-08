"use strict";

const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const { jwt } = require("../../../config");
const TABLE = "users";
const bcrypt = require("bcryptjs");

async function updatePlayer(req, res, next) {
  try {
    const { id } = req.params;
    let { userId, userRol } = req.headers.authorization;
    userId = Number(id);
    const {
      userName,
      userEmail,
      userLocation,
      userTeam,
      userPosition,
      userNumber,
      userBirthday,
      userDescription,
    } = req.body;
    const userDataUpdated = {
      userName,
      userEmail,
      userLocation,
      userTeam,
      userPosition,
      userNumber,
      userBirthday,
      userDescription,
    };
    const userExists = await model.findOne({ userId }, TABLE);
    if (!userExists) {
      return response.error(req, res, "El usuario no existe", 404);
    }

    if (userExists.userId === userId) {
      await model.update1(userDataUpdated, TABLE, { userId: userId });
    } else {
      return response.error(req, res, "Fallo", 403);
    }

    response.success(req, res, "Usuario actualizado", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = updatePlayer;
