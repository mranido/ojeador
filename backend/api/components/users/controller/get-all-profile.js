"use strict";

const Joi = require("joi");
const schema = require("../schemas");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";
const response = require("../../../routes/response");

async function getAllUsersProfile(req, res, next) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL
    const { id } = req.params;
    const userId = Number(id);

    const user = await model.findAll(TABLE);

    res.status(200).json({
      user,
    });
    // response.success(req, res, { user }, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllUsersProfile;
