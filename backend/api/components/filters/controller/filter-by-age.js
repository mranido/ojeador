"use strict";
const response = require("../../../routes/response");
const model = require("../../../infrastructure/mock-db");
const TABLE = "users";
const { years } = require("../../../helpers/age");

async function getAge(req, res, next) {
  try {
    const user = await model.findAll(TABLE);
    if (!user) {
      return response.error(
        req,
        res,
        "No existe resultados a tu búsqueda!",
        400
      );
    }

    const datos = [];
    for (const position of user) {
      datos.push(position.userBirthday);
    }

    const age = datos.map((edad) => years(edad));
    console.log(age);

    response.success(req, res, user, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getAge;
