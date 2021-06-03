"use strict";

const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const { jwt } = require("../../../config");
const TABLE = "users";
const bcrypt = require("bcryptjs");

async function updateScout(req, res, next) {
  try {
    const { id } = req.params;
    let { userId, userRol } = req.headers.authorization;
    userId = Number(id);

    console.log(userId);

    const {
      userName,
      userEmail,
      userLocation,
      userTeam,
      userDescription,
    } = req.body;
    console.log("este es el usuario:", userId);
    console.log("password", req.body.userPassword);
    const userDataUpdated = {
      userName,
      userEmail,
      userLocation,
      userTeam,
      userDescription,
    };

    console.log(userDataUpdated);
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
    console.log(error);
    next(error);
  }
}

module.exports = updateScout;
