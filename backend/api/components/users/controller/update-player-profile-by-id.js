"use strict";

const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const accessAuth = require("../../../middlewares/access-auth");
const { jwt } = require("../../../config");
const TABLE = "users";

const schemaId = Joi.number().positive();

async function updatePlayerProfile(req, res, next) {
  try {
    const { body } = req;
    const { id } = req.params;
    const userId = Number(id);
    const { authorization } = req.headers;
    // userSchema.validateAsync(user);

    // accessAuth.decodedToken(authorization);

    // const token = authorization.replace("Bearer ", "");

    const userExists = await usersRepository.findUserById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    const userUpdated = {
      id: userId,
      name: body.name,
      email: body.email,
      password: body.password,
      location: body.location,
      team: body.team,
      number: body.number,
      image: body.image,
      birthday: body.birthday,
      description: body.description,
    };

    await usersRepository.updateUserById(userUpdated);
  } catch (error) {
    next(error);
  }
}

module.exports = updatePlayerProfile;
