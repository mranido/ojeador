"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");
const bodyParser = require("body-parser").json();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //.split(" ")[1];
    console.log('jjjj', token);
    const decodedToken = jwt.verify(JSON.parse(token), config.jwt.secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};


