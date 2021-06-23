"use strict";

const database = require("../infrastructure/database");

async function addUser(user) {
  const pool = await database.getPool();
  const now = new Date();
  const query = `INSERT INTO users (
        userName,
        userEmail,
        userPassword,
        userVerificationCode,
        userRol,
        userCreatedAt
        ) VALUES (?,?,?,?,?,?)`;
  const [created] = await pool.query(query, [...Object.values(user), now]);

  return created.insertId;
}

async function activateValidation(userVerificationCode) {
  const now = new Date();

  const pool = await database.getPool();
  const updateQuery = `UPDATE users
    SET userVerifiedAt = ?
    WHERE userVerificationCode = ?
    AND userVerifiedAt IS NULL`;

  const [resultActivation] = await pool.query(updateQuery, [
    now,
    userVerificationCode,
  ]);

  return resultActivation.affectedRows === 1;
}

async function getUserByVerificationCode(userVerificationCode) {
  const pool = await database.getPool();
  const query = `SELECT userName, userEmail
  FROM users
  WHERE userVerificationCode = ?`;
  const [user] = await pool.query(query, userVerificationCode);

  return user[0];
}

async function findAllUsers(userRol) {
  const pool = await database.getPool();
  const query = `SELECT userId, userName, userEmail, userVerifiedAt FROM users where userRol =?`;

  const [users] = await pool.query(query, userRol);

  return users;
}

async function login(userEmail) {
  const pool = await database.getPool();
  const query = `SELECT userId, userName, userRol, userVerifiedAt, userPassword
    FROM users
    WHERE userEmail = ?`;
  const [user] = await pool.query(query, userEmail);

  return user[0];
}
async function removeUserById(userId) {
  const pool = await database.getPool();
  const query = `DELETE FROM users WHERE userId = ?`;
  await pool.query(query, userId);

  return true;
}

async function findUserById(userId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM users WHERE userId = ?";
  const [users] = await pool.query(query, userId);

  return users[0];
}

async function updateUserById(data) {
  const {
    userId,
    userName,
    userEmail,
    userPassword,
    userLocation,
    userTeam,
    userNumber,
    userImage,
    userBirhtday,
    userDescription,
  } = data;
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery = `UPDATE users
  SET userName = ?, userEmail = ?, userPassword = ?, userLocation =?, userTeam=?, userNumber=?, userImage=?, userBirthday=?, userDescription=?, userUpdatedAt=?
  WHERE userId = ?`;
  await pool.query(updateQuery, [
    userName,
    userEmail,
    userPassword,
    userLocation,
    userTeam,
    userNumber,
    userImage,
    userBirhtday,
    userDescription,
    now,
    userId,
  ]);

  return true;
}

async function findUserProfileImage(userId) {
  const pool = await database.getPool();
  const query = `SELECT userImage FROM users WHERE userId = ?`;
  const [users] = await pool.query(query, userId);

  return users[0];
}

async function uploadUserProfileImage(userId, userImage) {
  const pool = await database.getPool();
  const updateQuery = `UPDATE users SET userImage = ? WHERE userId = ?`;
  await pool.query(updateQuery, [userImage, userId]);

  return true;
}
async function addVerificationCode(userId, userVerificationCode) {
  const now = new Date();
  const pool = await database.getPool();
  const insertQuery = `
    UPDATE INTO users SET userVerificationCode = ?,
    userUpdatedAt = ?,
    userVerifiedAt = ?
    WHERE userId = ?
  `;
  const [created] = await pool.query(insertQuery, [
    userVerificationCode,
    now,
    now,
    userId,
  ]);

  return created.insertId;
}
async function getUserByEmail(userEmail) {
  const pool = await database.getPool();
  const query = `SELECT userId, userEmail
  FROM users
  WHERE userEmail = ?`;
  const [user] = await pool.query(query, userEmail);

  return user[0];
}

module.exports = {
  addUser,
  activateValidation,
  addVerificationCode,
  findAllUsers,
  findUserById,
  findUserProfileImage,
  removeUserById,
  updateUserById,
  uploadUserProfileImage,
  login,
  getUserByVerificationCode,
  getUserByEmail,
};
// import getConnection from "../../services/database";
// import helpers from "../../../utils/helpers";
// let connectionDB;

// export default {
//   find: async (request = {}, tableName) => {
//     connectionDB = await getConnection();
//     let sql = `SELECT * FROM ${tableName}`;
//     let [requestQuery] = await connectionDB.query(sql);

//     if (!Object.keys(request).length) {
//       return requestQuery;
//     }

//     const { columnSet, values } = helpers.multipleColumnSet(request);
//     sql += ` WHERE ${columnSet}`;

//     return await connectionDB.query(sql, [...values]);
//   },

//   findOne: async (params, tableName) => {
//     connectionDB = await getConnection();
//     const { columnSet, values } = helpers.multipleColumnSet(params);

//     const sql = `SELECT * FROM ${tableName}
//         WHERE ${columnSet}`;

//     const [result] = await connectionDB.query(sql, [...values]);
//     return result[0];
//   },
//   create: async (user, tableName) => {
//     connectionDB = await getConnection();

//     const [result] = await connectionDB.query(
//       `
// 			INSERT INTO ${tableName} SET ?`,
//       [user]
//     );

//     const affectedRows = result ? result.affectedRows : 0;

//     return affectedRows;
//   },
// };

// import mysql from "mysql2/promise";
// import config from "../../config";

// let pool;

// async function getConnection() {
//   if (!pool) {
//     pool = mysql.createPool(config.mysql);
//   }
//   return await pool.getConnection();
// }

// export default getConnection;
