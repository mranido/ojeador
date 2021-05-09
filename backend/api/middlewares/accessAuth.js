"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");

const accessAuth = {
  decodedToken: (token) => {
    console.log("token", token);
    const tokenDecoded = jwt.decode(token, config.jwt.secret);
    console.log(tokenDecoded);
    return tokenDecoded;
  },

  only_player: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      // we check if reequest has an authorization in headers
      if (!authorization) {
        return res.status(401).send({
          message: "Debes estar registrado para tener acceso a esta sección",
        });
      }
      const authNoBearer = authorization.split(" ")[1];
      console.log(
        "ESTE ES EL AUTHORIZATION::::::",
        authorization,
        "ESTE ES EL no bearer::::::",
        authNoBearer
      );

      const { userId, userName, userEmail, userRol } = accessAuth.decodedToken(authNoBearer);
      console.log(req.params.id);
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
      console.log("ESTE ES EL USER ROL DE ONLY FANS", userRol);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = accessAuth;
