"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  loginPlayer,
  loginScout,
} = require("../../repositories/users-respository");
const createJsonError = require("../../errors/create-json-error");

const schemaPlayer = Joi.object({
  playerEmail: Joi.string().email().required(),
  playerPassword: Joi.string().min(4).max(20).required(),
});

async function loginJugador(req, res) {
  try {
    const { body } = req;
    await schemaPlayer.validateAsync(body);
    const { playerEmail, playerPassword } = body;

    // 1. Buscamos el usuario en la base de datos
    const player = await loginPlayer(playerEmail, playerPassword);
    console.log("--> user", player);
    // 2. Validamo sel usuario
    if (!player) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      // 403 - Forbidden. El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada
      error.status = 403;
      throw error;
    }
    const { playerId, playerName, playerRol, playerVerifiedAt } = player;
    // 3. Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(
      playerPassword,
      player.playerPassword
    );
    if (!isValidPassword) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      error.status = 403;
      throw error;
    }
    // 4. Comprobamos que su cuenta esta activa
    if (!playerVerifiedAt) {
      const error = new Error(
        "Verifique su cuenta para poder acceder a nuestros servicios"
      );
      // 401 - Unauthorized. Similar a 403, pero en este caso, la autenticación es posible.
      error.status = 401;
      throw error;
    }
    const { JWT_SECRET, JWT_SESSION_TIME } = process.env;
    // 5. generar el JWT
    const tokenPayload = { playerId, playerName, playerRol };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_SESSION_TIME,
    });

    const response = {
      accessToken: token,
      expiresIn: JWT_SESSION_TIME,
    };

    res.status(200);
    res.send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}

const schemaScout = Joi.object({
  scoutEmail: Joi.string().email().required(),
  scoutPassword: Joi.string().min(4).max(20).required(),
});

async function loginOjeador(req, res) {
  try {
    const { body } = req;
    await schemaScout.validateAsync(body);
    const { scoutEmail, scoutPassword } = body;

    // 1. Buscamos el usuario en la base de datos
    const scout = await loginScout(scoutEmail, scoutPassword);
    console.log("--> user", scout);
    // 2. Validamo sel usuario
    if (!scout) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      // 403 - Forbidden. El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada
      error.status = 403;
      throw error;
    }
    const { scoutId, scoutName, scoutRol, scoutVerifiedAt } = scout;
    // 3. Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(
      scoutPassword,
      scout.scoutPassword
    );
    if (!isValidPassword) {
      const error = new Error(
        "No existe un usuario con ese username y password"
      );
      error.status = 403;
      throw error;
    }
    // 4. Comprobamos que su cuenta esta activa
    if (!scoutVerifiedAt) {
      const error = new Error(
        "Verifique su cuenta para poder acceder a nuestros servicios"
      );
      // 401 - Unauthorized. Similar a 403, pero en este caso, la autenticación es posible.
      error.status = 401;
      throw error;
    }
    const { JWT_SECRET, JWT_SESSION_TIME } = process.env;
    // 5. generar el JWT
    const tokenPayload = { scoutId, scoutName, scoutRol };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_SESSION_TIME,
    });

    const response = {
      accessToken: token,
      expiresIn: JWT_SESSION_TIME,
    };

    res.status(200);
    res.send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}
module.exports = { loginJugador, loginOjeador };
