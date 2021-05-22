"use strict";
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");

async function findTeams(req, res, next) {
  const findTeam = req.params.team;
  console.log(findTeam);
  try {
    const connection = await getConnection();
    const getPositionQuery = `SELECT userId, userName, userBirthday, userPosition, userTeam
                                    FROM users
                                    WHERE userTeam = ?
                                    and userRol = 'Player'`;
    const [results] = await connection.execute(getPositionQuery, [
      findTeam,
    ]);
    console.log("Resultado Equipo", results);
    connection.release();
    if (results.length === 0) {
      return response.error(req, res, "Equipo no encontrado", 404);
    }

    return response.success(req, res, results, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = findTeams;
