"use strict";

const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const accessAuth = require("../../../middlewares/access-auth");
const { jwt } = require("../../../config");
const schema = require("../schemas");
const TABLE = "users";

async function updatePlayer(req, res, next) {
  try {
    console.log(req.body);
    response.success(req, res, "ola", 201);
    const {id} = req.params;
    const userId = Number(id);
    console.log(body);
    await schema.update.validateAsync(req.body);
    // const {
    //   name,
    //   userEmail,
    //   userPassword,
    //   userLocation,
    //   userTeam,
    //   userNumber,
    //   userImage,
    //   userBirthday,
    //   userDescription,
    // } = req.body;
    // // accessAuth.decodedToken(authorization);

    // // const token = authorization.replace("Bearer ", "");

    // const userExists = await model.findOne({ userId }, TABLE);
    // if (!userExists) {
    //   return response.error(req, res, "El usuario no existe", 404);
    // }
    // const userUpdated = {
    //   userId,
    //   userName: name,
    //   userEmail,
    //   userPassword,
    //   userLocation,
    //   userTeam,
    //   userNumber,
    //   userImage,
    //   userBirthday,
    //   userDescription,
    // };

    // await model.update(userUpdated, TABLE);
  } catch (error) {
    next(error);
  }
}

module.exports = updatePlayer;
