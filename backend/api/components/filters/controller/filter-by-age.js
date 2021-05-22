"use strict";
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");
const { years } = require("../../../helpers/age");

async function getCategory(req, res, next) {
  const findCategory = req.params.category;

  try {
    const connection = await getConnection();
    const getAge = `SELECT userId, userName, timestampdiff(year,userbirthday, curdate()) as userAge, userPosition, userTeam
                                    FROM users where userRol ='Player';`;
    const [results] = await connection.execute(getAge);

    connection.release();
    if (results.length === 0) {
      return response.error(req, res, "Edad no encontrada", 404);
    }

    const iterableWithoutBinaryRow = Object.values(JSON.parse(JSON.stringify(results)));

    const dataUserWithCategory = iterableWithoutBinaryRow.map((item) => {
      const category = years(item.userAge);
      return { ...item, category };
    });

    const category = dataUserWithCategory.filter((item)=>findCategory ===item.category);

    return response.success(req, res, category, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getCategory;
