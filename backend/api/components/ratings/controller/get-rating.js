'use strict';

const response = require("../../../routes/response");
const model = require("../../../infrastructure/mock-db");
const TABLE ='users';

async function getRate(req, res, next) {
  try {
    const { id } = req.params;
    const userId = Number(id);


    const user = await model.findOne({ userId }, TABLE);
    if (!user) {
      return response.error(
        req,
        res,
        "No puedes votar a una persona que no existe!",
        400
      );
    }

   const ratings = await model.getRating(userId);

    response.success(req, res, ratings , 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getRate;