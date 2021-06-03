"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");

const accessAuth = {
  decodedToken: (token) => {
    console.log("token", token);
    const tokenDecoded = jwt.verify(token, config.jwt.secret);
    console.log(tokenDecoded);
    return tokenDecoded;
  },

  registred: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      console.log(authorization);
      // we check if reequest has an authorization in headers
      if (!authorization) {
        return res.status(401).send({
          message: "Debes estar registrado para tener acceso a esta sección",
        });
      }
      const authNoBearer = authorization.split(" ")[1];

      const { userId, userName, userEmail, userRol } =
        accessAuth.decodedToken(authNoBearer);
      console.log(accessAuth.decodedToken(authNoBearer));
      console.log(userId);
      if (userId !== Number(req.params.id)) {
        console.log(Number(req.params.id));
        console.log(req.params.id);
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
      console.log("Actualizado", userRol);
    } catch (error) {
      next(error);
    }
  },
  onlyScout: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      console.log(authorization);
      // we check if reequest has an authorization in headers
      if (!authorization) {
        return res.status(401).send({
          message: "Debes estar registrado para tener acceso a esta sección",
        });
      }
      const authNoBearer = authorization.split(" ")[1];

      const { userId, userName, userEmail, userRol } =
        accessAuth.decodedToken(authNoBearer);
      console.log(accessAuth.decodedToken(authNoBearer));
      console.log(userId);
      if (userRol !== "Scout") {
        return res.status(401).send({
          message: "No tienes permiso para relizar dicha petición",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = accessAuth;
