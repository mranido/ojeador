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
    console.log(userEmail);
    const user = await await model.findOne({ userId }, TABLE);

    if (userId === undefined || !user) {
      return response.error(req, res, "No hay usuarios", 409);
    }
    // if (userId === id) {
    //   return "ok";
    // }

    res.status(200).json({
      data: { id: user.userId, name: user.userName, rol: user.userRol },
    });
    response.success(
      req,
      res,
      { id: user.userId, name: user.userName, rol: user.userRol },
      201
    );
  } catch (error) {
    next(error);
  }
}

module.exports = getUserProfile;
