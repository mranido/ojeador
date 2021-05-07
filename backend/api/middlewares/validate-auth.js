"use strict";

const jwt = require("jsonwebtoken");
const createJsonError = require("../errors/create-json-error");
const {JWT_SECRET} = process.env;
const config = require("../config");

/**
 * Extrae el JWT enviado en los encabezados de la solicitud sin verificar su vencimiento.
 * @returns {Object} Objeto de autenticación que contiene la identificación de usuario, el correo electrónico y la matriz de roles.
 * @param {Object} encabezados solicitan encabezados.
 * @returns {String} token extraído de los encabezados.
 */
function extractAccessToken(headers) {
  const { authorization } = headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Authorization required");
    error.status = 403;
    throw error;
  }

  return authorization.split(" ");
  //return authorization.slice(7, authorization.length);
}

function validateAuth(req, res, next) {
  try {
    console.log(req.headers);
    const token = extractAccessToken(req.headers);

    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    const { userId, userName, userEmail, userRol } = decodedToken;

    req.auth = { userId, userName, userEmail, userRol };

    next();
  } catch (error) {
    //console.log('error', error.message);
    //console.log('error', error.expiredAt);
    error.status = 401;
    createJsonError(error, res);
  }
}

module.exports = validateAuth;
