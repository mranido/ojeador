"use strict";

const Joi = require("joi");
const createJsonError = require("../../../errors/create-json-error");
const {
  findUserById,
  removeUserById,
} = require("../../../repositories/users-respository");
const throwJsonError = require("../../../errors/throw-json-error");

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {
    // Cogemos el id
    const { id: userId } = req.params;
    await schema.validateAsync(userId);

    const user = await findUserById(userId);
    if (!user) {
      return throwJsonError("Usuario no existe", 400);
    }

    await removeUserById(userId);

    res.status(200).json({ message: "Se ha borrado correctamente el usuario" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;
