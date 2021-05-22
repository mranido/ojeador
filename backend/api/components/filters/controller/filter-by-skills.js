"use strict";
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");

async function findSkills(req, res, next) {
  const findSkill = req.params.skills;
  console.log(req.params);
  try {
    const connection = await getConnection();
    const getSkillQuery = `select a.userName as userName, b.positionName as userPosition, d.skillName as userSkills, truncate(avg(e.ratingValue),1) as userPuntuation
    from users a left join positions b
    on a.userPosition = b.positionName
    left join positionsSkills c
    on b.positionId = c.positionSkillPositionId 
    right join skills d 
    on c.positionSkillSkillId = d.skillId
    right join ratings e
    on e.ratingPositionSkillId = c.positionSkillId
    where e.ratingIdUser = a.UserId
    and a.userRol= 'Player'
    group by a.userId, b.positionName, d.skillName`;
    const [results] = await connection.execute(getSkillQuery);
    connection.release();
    if (results.length === 0) {
      return response.error(req, res, "Habilidad no encontrada", 404);
    }

    const iterableWithoutBinaryRow = Object.values(
      JSON.parse(JSON.stringify(results))
    );

    const skill = iterableWithoutBinaryRow.filter(
      (item) => findSkill === item.userSkills
    );
    if (skill.length===0) {
    response.error(req, res, "No existen resultados para esta búsqueda", 401);
    }
    console.log(iterableWithoutBinaryRow);
    return response.success(req, res, skill, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = findSkills;
