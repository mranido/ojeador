'use strict';
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database")

async function findPositions(req, res,next) {
  const findPosition = req.params.position;
console.log(req.params);
  try {
    const connection = await getConnection();
    const getPositionQuery = `SELECT userId, userName, userBirthday, userPosition, userTeam
                                    FROM users
                                    WHERE userPosition = ?`;
    const [results] = await connection.execute(getPositionQuery, [findPosition]);
    console.log('Resultado Mediocentro --|--', results);
    connection.release();
    if (results.length === 0) {
      return response.error(req, res, 'Posición no encontrada', 404)
    }

    return response.success(req, res, results, 201);
  } catch (error) {
    next(error)
  }
}

module.exports = findPositions;
