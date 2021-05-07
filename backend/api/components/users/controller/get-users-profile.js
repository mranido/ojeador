"use strict";

const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";
const response = require("../../../routes/response");

async function getUserProfile(req, res, next) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL
    const { userId } = req.params;
    parseInt(userId);
    console.log(req.auth);

    const user = await model.findOne({ userId }, TABLE);
    console.log(user);

    if (userId === undefined || !user) {
      return response.error(req, res, "No hay usuarios", 409);
    }
    // if (userId === id) {
    //   return "ok";
    // }

    res.status(200).json({
      data: { id: user.userId, rol: user.userRol },
    });
    response.success(req, res, { id: user.userId, rol: user.userRol }, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getUserProfile;
