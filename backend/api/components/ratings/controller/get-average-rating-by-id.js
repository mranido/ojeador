"use strict";

const response = require("../../../routes/response");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";

async function getAverageRating(req, res, next) {
  try {
    const { id } = req.params;
    const userId = Number(id);

    const user = await model.findOne({ userId }, TABLE);
    if (!user) {
      return response.error(req, res, "No existe la persona indicada!", 400);
    }

    const averageRating = await model.getAverageRating(userId);

    res.send(averageRating).status(201);
    //response.success(req, res, averageRating, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getAverageRating;
