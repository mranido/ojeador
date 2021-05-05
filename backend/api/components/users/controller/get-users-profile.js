"use strict";

const Joi = require("joi");
const usersRepository = require("../../../repositories/users-respository");
const createJsonError = require("../../../errors/create-json-error");
const config = require("../../../config");

async function getUserProfile(req, res) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL
    const { id: userId } = req.params;
    const user = await usersRepository.findUserById(userId);

    if (userId === undefined || !user) {
      return res.status(400).send({ message: "no hay usuarios" });
    }

    // const image = `${config.api.host}:${config.api.port}/${config.files.userImage}/${user.image}`;

    //const { nombre, email, rol, createdAt } = user;

    res.status(200).json({
      data: { id: user.userId, name: user.userName, rol: user.userRol },
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserProfile;
