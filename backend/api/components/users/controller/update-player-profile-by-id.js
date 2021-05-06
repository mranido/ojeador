"use strict";

const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const accessAuth = require("../../../middlewares/access-auth");
const { jwt } = require("../../../config");
const schema = require("../schemas");
const TABLE = "users";

// async function updatePlayer(req, res, next) {
//   try {
//     const { userEmail } = req.auth;
//     console.log("polllas", req.auth);
//     const { id } = req.params;
//     const userId = Number(id);
//     const user = await model.findOne({ userId }, TABLE);
//     if (!user) {
//       return response.error(req, res, "El usuario no existe", 404);
//     }
//     const { body } = req;
//     await schema.update.validateAsync(body);
//     const {
//       userName,
//       userPassword,
//       userLocation,
//       userTeam,
//       userNumber,
//       userImage,
//       userBirthday,
//       userDescription,
//     } = req.body;

//     const userExists = await model.findOne({ userId }, TABLE);
//     if (!userExists) {
//       return response.error(req, res, "El usuario no existe", 404);
//     }
//     console.log(userExists);
//     const userUpdated = {
//       userName,
//       userPassword,
//       userLocation,
//       userTeam,
//       userNumber,
//       userImage,
//       userBirthday,
//       userDescription,
//     };

//     await model.update(userUpdated, TABLE, userEmail);

//     response.success(req, res, "Soy el puto amo", 201);
//   } catch (error) {
//     next(error);
//   }
// }
async function updatePlayer(req, res, next) {
  try {
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
