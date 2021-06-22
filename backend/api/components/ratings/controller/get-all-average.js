"use strict";

const response = require("../../../routes/response");
const model = require("../../../infrastructure/mock-db");

async function getAllAverageRating(req, res, next) {
  try {
    const connection = await getConnection();
    const getAllAverage = `select a.userName, truncate(avg(e.ratingValue),1) as averagePuntuation
    from users a left join positions b
    on a.userPosition = b.positionName
    left join positionsSkills c
    on b.positionId = c.positionSkillPositionId 
    right join skills d 
    on c.positionSkillSkillId = d.skillId
    right join ratings e
    on e.ratingPositionSkillId = c.positionSkillId
    where a.userId = e.ratingIdUser
    group by a.userId`;
    const [allAverageRating] = await connection.execute(getAllAverage);
    connection.release();
    res.send(allAverageRating[0]).status(201);
    //response.success(req, res, averageRating, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllAverageRating;
