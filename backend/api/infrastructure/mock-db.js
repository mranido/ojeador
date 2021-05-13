"use strict";
const { async } = require("crypto-random-string");
const getConnection = require("../infrastructure/database");
let connectionDB;

function multipleColumnSet(object) {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  let columnSet = keys.map((key) => `${key} = ?`).join(", ");

  return {
    columnSet,
    values,
  };
}

module.exports = {
  find: async (request = {}, tableName) => {
    connectionDB = await getConnection();
    const sql = `SELECT * FROM ${tableName}`;
    const requestQuery = await connectionDB.query(sql);

    if (!Object.keys(request).length) {
      return requestQuery;
    }

    const { columnSet, values } = multipleColumnSet(request);
    sql += ` WHERE ${columnSet}`;

    return await connectionDB.query(sql, [...values]);
  },

  findAll: async (tableName) => {
    connectionDB = await getConnection();

    const sql = `SELECT * FROM ${tableName}`;

    const [result] = await connectionDB.query(sql);
    return result;
  },

  findOne: async (params, tableName) => {
    connectionDB = await getConnection();
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${tableName}
        WHERE ${columnSet}`;

    const [result] = await connectionDB.query(sql, [...values]);
    return result[0];
  },
  findOneAndFilter: async (params, tableName) => {
    connectionDB = await getConnection();
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT userImage FROM ${tableName}
        WHERE ${columnSet}`;

    const [result] = await connectionDB.query(sql, [...values]);
    return result[0];
  },

  delete: async (params, tableName) => {
    connectionDB = await getConnection();
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `DELETE FROM ${tableName}
        WHERE ${columnSet}`;

    const [result] = await connectionDB.query(sql, [...values]);
    return result[0];
  },
  create: async (user, tableName) => {
    connectionDB = await getConnection();

    const [result] = await connectionDB.query(
      `
			INSERT INTO ${tableName} SET ?`,
      [user]
    );

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  },
  update: async (user, tableName, where) => {
    connectionDB = await getConnection();
    if (where === undefined || where === null) {
      const sql = `
			UPDATE ${tableName} SET ?`;

      const [result] = await connectionDB.query(sql, [user]);

      const affectedRows = result ? result.affectedRows : 0;

      return affectedRows;
    } else {
      const sql = `
			UPDATE ${tableName} SET ? WHERE ${where}=?`;

      const [result] = await connectionDB.query(sql, [user, where]);

      const affectedRows = result ? result.affectedRows : 0;

      return affectedRows;
    }
  },
  update1: async (user, tableName, where) => {
    connectionDB = await getConnection();
    const { columnSet, values } = multipleColumnSet(user);
    const { columnSet: condition, values: cValues } = multipleColumnSet(where);
    let sql = `
			UPDATE ${tableName} SET ${columnSet} WHERE ${condition}`;

    const [result] = await connectionDB.query(sql, [...values, cValues]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  },
  getRating: async (user) => {
    connectionDB = await getConnection();
    const sql = `select a.userName as Nombre, b.positionName as Posición, d.skillName as Habilidades, truncate(avg(e.ratingValue),1) as Puntuación
    from users a left join positions b
    on a.userPosition = b.positionName
    left join positionsSkills c
    on b.positionId = c.positionSkillPositionId 
    right join skills d 
    on c.positionSkillSkillId = d.skillId
    right join ratings e
    on e.ratingPositionSkillId = c.positionSkillId
    where a.userId = ${user}
    and e.ratingIdUser =${user}
    group by a.userId, b.positionName, d.skillName`;
    const [result] = await connectionDB.query(sql);
    return result;
  },
  getAverageRating: async(user) =>{
     connectionDB = await getConnection();
     const sql = `select a.userName as Nombre, truncate(avg(e.ratingValue),1) as "Puntuación Media"
    from users a left join positions b
    on a.userPosition = b.positionName
    left join positionsSkills c
    on b.positionId = c.positionSkillPositionId 
    right join skills d 
    on c.positionSkillSkillId = d.skillId
    right join ratings e
    on e.ratingPositionSkillId = c.positionSkillId
    where a.userId = ${user}
    and e.ratingIdUser =${user}
    group by a.userId`;
     const [result] = await connectionDB.query(sql);
     return result;
  }
};
