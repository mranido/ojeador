"use strict";

const response = require("../../../routes/response");
const TABLE = "ratings";
const TABLE2 = "users";
const model = require("../../../infrastructure/mock-db");

async function createRate(req, res, next) {
  try {
    const { id } = req.params;
    
    const userId = Number(id);
    const {
      ratingIdUser,
      ratingIdVoteUser,
      ratingValue,
      ratingPositionSkillId,
    } = req.body;
    const now = new Date();

    const user = await model.findOne({ userId }, TABLE2);
    if (!user) {
      return response.error(req, res, "No puedes votar a una persona que no existe!", 400);
    }
    if(user.userId === ratingIdVoteUser){
      return response.error(req, res, "No puedes votarte a ti mismo")
    }
    

    const ratingDB = {
      ratingIdUser: user.userId,
      ratingIdVoteUser,
      ratingValue,
      ratingPositionSkillId,
    };

    await model.create(ratingDB, TABLE);

    response.success(req, res, "Voto realizado con éxito", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = createRate;
