"use strict";

const response = require("../../../routes/response");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";

async function getAllAverageRating(req, res, next) {
  try {
    const allAverageRating = await model.getAllAverageRating();

    res.send(allAverageRating).status(201);
    //response.success(req, res, averageRating, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllAverageRating;
