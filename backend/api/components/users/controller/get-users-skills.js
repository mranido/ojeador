"use strict";
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");

async function getSkills(req, res, next) {
const { id } = req.params;
const userId = Number(id);

  try {
    const connection = await getConnection();
    const getSkillQuery = `select c.positionSkillId, d.skillName
    from users a left join positions b
    on a.userPosition = b.positionName
    left join positionsSkills c
    on b.positionId = c.positionSkillPositionId 
    right join skills d 
    on c.positionSkillSkillId = d.skillId
    where a.userRol= 'Player'
    and a.userId =?
    and a.userId is not null
    group by a.userId, b.positionId, c.positionSkillId, d.skillId;`;
    const [results] = await connection.execute(getSkillQuery, [userId]);
    connection.release();
    if (results.length === 0) {
      return response.error(req, res, "Habilidad no encontrada", 404);
    }

    const iterableWithoutBinaryRow = Object.values(
      JSON.parse(JSON.stringify(results))
    );

    if (!iterableWithoutBinaryRow) {
      response.error(req, res, "No tiene habilidades", 401);
    }


        res.send(iterableWithoutBinaryRow).status(201);
  } catch (error) {
    next(error);
  }
}

module.exports = getSkills;
