"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const accessAuth = require("../../../middlewares/accessAuth");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";
const response = require("../../../routes/response");

async function loginUser(req, res, next) {
  try {
    await schema.login.validateAsync(req.body);

    const { userEmail, userPassword } = req.body;

    // 1. Buscamos el usuario en la base de datos
    const user = await model.findOne({ userEmail }, TABLE);

    // 2. Validamo sel usuario
    if (!user) {
      return response.error(req, res, "Usuario erróneo", 409);
    }
    const { userId, userName, userRol, userVerifiedAt } = user;
    // 3. Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(
      userPassword,
      user.userPassword
    );
    if (!isValidPassword) {
      return response.error(
        req,
        res,
        "No existe usuario o contraseña no válida",
        403
      );
    }
    // 4. Comprobamos que su cuenta esta activa
    if (!userVerifiedAt) {
      return response.error(
        req,
        res,
        "Verifica tu cuenta para proceder con nuestros servicios",
        403
      );
    }

    // 5. generar el JWT
    const tokenPayload = { userId, userName, userEmail, userRol };
    const token = jwt.sign(tokenPayload, config.jwt.secret, {
      expiresIn: config.jwt.sesion,
    });

    const tokenData = {
      accessToken: token,
      expiresIn: config.jwt.sesion,
    };

    res.status(200);
    res.send(tokenData);
  } catch (error) {
    next(error);
  }
}

module.exports = loginUser;
