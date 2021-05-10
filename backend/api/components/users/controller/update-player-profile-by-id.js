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
    const userId = Number(id);


    const {
      userName,
      userEmail,
      userPassword,
      userLocation,
      userTeam,
      userPosition,
      userNumber,
      userImage,
      userBirthday,
      userDescription,
    } = req.body;
    console.log("este es el puto usuario::::::::::::", userId);
    console.log("puto password", req.body.userPassword);
    const userDataUpdated = {
      userName,
      userEmail,
      userPassword: await bcrypt.hash(userPassword, 10),
      userLocation,
      userTeam,
      userPosition,
      userNumber,
      userImage,
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
      return response.error(req, res, "tu madre", 403);
    }

    response.success(req, res, "Soy el puto amo", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = updatePlayer;
