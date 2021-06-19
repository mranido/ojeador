"use strict";

const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";
const response = require("../../../routes/response");

async function getUserProfile(req, res, next) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL
    const { id } = req.params;
    const userId = Number(id);

    const user = await model.findOne({ userId }, TABLE);

    if (userId === undefined || !user) {
      return response.error(req, res, "No hay usuarios", 409);
    }
    if (userId === id) {
      return "ok";
    }

    res.status(200).json({
      user,
    });
    // response.success(req, res, { user }, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getUserProfile;
