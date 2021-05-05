"use strict";

const Joi = require("joi");
const usersRepository = require("../../../repositories/users-respository");
const createJsonError = require("../../../errors/create-json-error");
const config = require("../../../config");

async function getUserProfile(req, res) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL
    const { id } = req.auth;
    const user = await usersRepository.findUserById(id);

    const image = `${config.api.host}:${config.api.port}/${config.files.playerImage}/${user.image}`;

    const { nombre, email, rol, createdAt } = user;

    res.status(200);
    res.send({ nombre, email, rol, createdAt, image });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserProfile;
