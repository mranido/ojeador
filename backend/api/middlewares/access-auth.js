"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");
//auth.replace
"Bearer ", "";

module.exports = {
  decodedToken: (token) => {
    const tokenDecoded = jwt.decode(token, config.jwt.secret);
    return tokenDecoded;
  },

  only_player: (req, res, next) => {
    console.log("DECODE", this.decodedToken);
    const { authorization } = req.headers;
    console.log(req.headers);

    // we check if reequest has an authorization in headers
    if (authorization) {
      const authNoBearer = authorization.split(" ")[1];
      console.log(
        "ESTE ES EL AUTHORIZATION::::::",
        authorization,
        "ESTE ES EL no bearer::::::",
        authNoBearer
      );
    } else {
      return res.status(401).send({
        message: "Debes estar registrado para tener acceso a esta sección",
      });
    }

    // we check if user token is admin or not
    try {
      /*	const {userRol} = verify(authorization, config.jwt.secret_key);

			if (is_admin === 0 || is_admin === 1)*/
      // else user get access
      next();
    } catch (error) {
      next(error);
    }
  },
};
