"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { login } = require("../../../repositories/users-respository");
const createJsonError = require("../../../errors/create-json-error");
const config = require("../../../config");

const schema = Joi.object({
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().min(4).max(20).required(),
});

async function loginUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { userEmail, userPassword } = body;

    // 1. Buscamos el usuario en la base de datos
    const user = await login(userEmail, userPassword);
    console.log("--> user", user);
    // 2. Validamo sel usuario
    if (!user) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      // 403 - Forbidden. El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada
      error.status = 403;
      throw error;
    }
    const { userId, userName, userRol, userVerifiedAt } = user;
    // 3. Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(
      userPassword,
      user.userPassword
    );
    if (!isValidPassword) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      error.status = 403;
      throw error;
    }
    // 4. Comprobamos que su cuenta esta activa
    if (!userVerifiedAt) {
      const error = new Error(
        "Verifique su cuenta para poder acceder a nuestros servicios"
      );
      // 401 - Unauthorized. Similar a 403, pero en este caso, la autenticación es posible.
      error.status = 401;
      throw error;
    }

    // 5. generar el JWT
    const tokenPayload = { userId, userName, userEmail, userRol };
    const token = jwt.sign(tokenPayload, config.jwt.secret, {
      expiresIn: config.jwt.sesion,
    });

    const response = {
      accessToken: token,
      expiresIn: config.jwt.sesion,
    };

    res.status(200);
    res.send(response);
    return true;
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { loginUser };
