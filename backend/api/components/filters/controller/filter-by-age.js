"use strict";
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");

async function getAge(req, res, next) {
  const findAge = Number(req.params.age);
  console.log(findAge);
  try {
    const connection = await getConnection();
    const getPositionQuery = `SELECT userId, userName, userBirthday as age, userPosition, userTeam
                                    FROM users
                                    WHERE userBirthday = timestampdiff(year,?, curdate())`;
    const [results] = await connection.execute(getPositionQuery, [
      findAge,
    ]);
    console.log("Edad --|--", results);
    connection.release();
    if (results.length === 0) {
      return response.error(req, res, "Posición no encontrada", 404);
    }

    return response.success(req, res, results, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getAge;
