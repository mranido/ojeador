"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");


const accessAuth = {
  decodedToken: (token) => {
    console.log("token", token);
    const tokenDecoded = jwt.decode(token, config.jwt.secret);
    return tokenDecoded;
  },

  only_player: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      console.log(req.headers);
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

      const { userRol, userId } = accessAuth.decodedToken(authNoBearer);
      if (userId !== Number(req.params.userId)){
                return res.status(401).send({
                  message:
                    "No puedes hacer esto",
                });
      }
      if (req.params.userRol !== 'Player' || req.params.userRol !== 'Scout'){
        return res.status(401).send({
          message: "No puedes hacer esto",
        });
      }
      next();
      console.log("ESTE ES EL USER ROL DE ONLY FANS", userRol);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = accessAuth;
