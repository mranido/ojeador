"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");

const accessAuth = {
  decodedToken: (token) => {
    const tokenDecoded = jwt.verify(token, config.jwt.secret);

    return tokenDecoded;
  },

  registred: (req, res, next) => {
    try {
      const { authorization } = req.headers;

      // we check if reequest has an authorization in headers
      if (!authorization) {
        return res.status(401).send({
          message: "Debes estar registrado para tener acceso a esta sección",
        });
      }
      const authNoBearer = authorization.split(" ")[1];

      const { userId, userName, userEmail, userRol } =
        accessAuth.decodedToken(authNoBearer);
      req.auth = { userId, userName, userEmail, userRol };

      if (userId !== Number(req.params.id)) {
        return res.status(401).send({
          message: "No puedes hacer esto",
        });
      }
      // if (userRol !== "Player" || userRol !== "Scout") {
      //   return res.status(401).send({
      //     message: "No puedes hacer esto",
      //   });
      // }
      next();
    } catch (error) {
      next(error);
    }
  },
  onlyScout: (req, res, next) => {
    try {
      const { authorization } = req.headers;

      // we check if reequest has an authorization in headers
      if (!authorization) {
        return res.status(401).send({
          message: "Debes estar registrado para tener acceso a esta sección",
        });
      }
      const authNoBearer = authorization.split(" ")[1];

      const { userId, userName, userEmail, userRol } =
        accessAuth.decodedToken(authNoBearer);
      req.auth = { userId, userName, userEmail, userRol };
      if (userRol !== "Scout") {
        return res.status(401).send({
          message: "Sólo los ojeadores pueden enviar contrataciones",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = accessAuth;
