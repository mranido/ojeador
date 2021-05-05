"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = {
  decodedToken: (token) => {
    const tokenDecoded = jwt.verify(token, config.jwt.secret);
    return tokenDecoded;
  },
};
