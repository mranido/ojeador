"use strict";

const database = require("../infrastructure/database");

async function addPlayer(player) {
  const pool = await database.getPool();
  const now = new Date();
  const query = `INSERT INTO players (
        playerName,
        playerEmail,
        playerPassword,
        playerVerificationCode,
        playerCreatedAt
    ) VALUES (?,?,?,?,?)`;
  const [created] = await pool.query(query, [...Object.values(player), now]);

  return created.insertId;
}

async function activateValidationPlayer(playerVerificationCode) {
  const now = new Date();

  const pool = await database.getPool();
  const updateQuery = `UPDATE players
    SET playerVerifiedAt = ?
    WHERE playerVerificationCode = ?
    AND playerVerifiedAt IS NULL`;

  const [resultActivation] = await pool.query(updateQuery, [
    now,
    playerVerificationCode,
  ]);

  return resultActivation.affectedRows === 1;
}

async function getPlayerByVerificationCode(playerVerificationCode) {
  const pool = await database.getPool();
  const query = `SELECT playerName, playerEmail
  FROM players
  WHERE playerVerificationCode = ?`;
  const [player] = await pool.query(query, playerVerificationCode);

  return player[0];
}

async function findAllPlayers() {
  const pool = await database.getPool();
  const query = `SELECT playerId, playerName, playerEmail, playerVerifiedAt FROM players`;
  console.log("query", query);
  const [players] = await pool.query(query);
  console.log("players", players);

  return players;
}

async function loginPlayer(playerEmail) {
  const pool = await database.getPool();
  const query = `SELECT playerId, playerName, playerRol, playerVerifiedAt, playerPassword
    FROM players
    WHERE playerEmail = ?`;
  const [player] = await pool.query(query, playerEmail);

  console.log(player);
  return player[0];
}
async function removePlayerById(playerId) {
  const pool = await database.getPool();
  const query = `DELETE FROM players WHERE playerId = ?`;
  await pool.query(query, playerId);

  return true;
}

async function findPlayerById(playerId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM players WHERE playerId = ?";
  const [players] = await pool.query(query, playerId);

  return players[0];
}

async function updatePlayerById(data) {
  const {
    playerId,
    playerName,
    playerEmail,
    playerPassword,
    playerUpdatedAt,
  } = data;
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery = `UPDATE players
  SET playerName = ?, playerEmail = ?, playerPassword = ?, playerUpdatedAt =?
  WHERE playerId = ?`;
  await pool.query(updateQuery, [
    playerName,
    playerEmail,
    playerPassword,
    now,
    playerId,
  ]);

  return true;
}

async function findPlayerProfileImage(playerId) {
  const pool = await database.getPool();
  const query = `SELECT playerImage FROM players WHERE playerId = ?`;
  const [players] = await pool.query(query, playerId);

  return players[0];
}

async function uploadPlayerProfileImagePlayer(playerId, playerImage) {
  const pool = await database.getPool();
  const updateQuery = `UPDATE players SET playerImage = ? WHERE playerId = ?`;
  await pool.query(updateQuery, [playerImage, playerId]);

  return true;
}
async function addVerificationCodePlayer(playerId, playerVerificationCode) {
  const now = new Date();
  const pool = await database.getPool();
  const insertQuery = `
    UPDATE INTO players SET playerVerificationCode = ?,
    playerUpdatedAt = ?,
    playerVerifiedAt = ?
    WHERE playerId = ?
  `;
  const [created] = await pool.query(insertQuery, [
    playerVerificationCode,
    now,
    now,
    playerId,
  ]);

  return created.insertId;
}
async function getPlayerByEmail(playerEmail) {
  const pool = await database.getPool();
  const query = `SELECT playerId, playerEmail
  FROM players
  WHERE playerEmail = ?`;
  const [player] = await pool.query(query, playerEmail);

  return player[0];
}

async function addScout(scout) {
  const pool = await database.getPool();
  const now = new Date();
  const query = `INSERT INTO scouts (
        scoutName,
        scoutEmail,
        scoutPassword,
        scoutVerificationCode,
        scoutCreatedAt
    ) VALUES (?,?,?,?,?)`;
  const [created] = await pool.query(query, [...Object.values(scout), now]);

  return created.insertId;
}

async function activateValidationScout(scoutVerificationCode) {
  const now = new Date();

  const pool = await database.getPool();
  const updateQuery = `UPDATE scouts
    SET scoutVerifiedAt = ?
    WHERE scoutVerificationCode = ?
    AND scoutVerifiedAt IS NULL`;

  const [resultActivation] = await pool.query(updateQuery, [
    now,
    scoutVerificationCode,
  ]);

  return resultActivation.affectedRows === 1;
}

async function getScoutByVerificationCode(scoutVerificationCode) {
  const pool = await database.getPool();
  const query = `SELECT scoutName, scoutEmail
  FROM scouts
  WHERE scoutVerificationCode = ?`;
  const [scout] = await pool.query(query, scoutVerificationCode);

  return scout[0];
}

async function findAllScouts() {
  const pool = await database.getPool();
  const query = `SELECT scoutId, scoutName, scoutEmail, scoutVerifiedAt FROM scouts`;
  console.log("query", query);
  const [scouts] = await pool.query(query);
  console.log("scouts", scouts);

  return scouts;
}

async function loginScout(scoutEmail) {
  const pool = await database.getPool();
  const query = `SELECT scoutId, scoutName, scoutRol, scoutVerifiedAt, scoutPassword
    FROM scouts
    WHERE scoutEmail = ?`;
  const [scout] = await pool.query(query, scoutEmail);

  console.log(scout);
  return scout[0];
}
async function removeScoutById(scoutId) {
  const pool = await database.getPool();
  const query = `DELETE FROM scouts WHERE scoutId = ?`;
  await pool.query(query, scoutId);

  return true;
}

async function findScoutById(scoutId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM scouts WHERE scoutId = ?";
  const [scouts] = await pool.query(query, scoutId);

  return scouts[0];
}

async function updateScoutById(data) {
  const {
    scoutId,
    scoutName,
    scoutEmail,
    scoutPassword,
    scoutUpdatedAt,
  } = data;
  const now = new Date();
  const pool = await database.getPool();
  const updateQuery = `UPDATE scouts
  SET scoutName = ?, scoutEmail = ?, scoutPassword = ?, scoutUpdatedAt =?
  WHERE scoutId = ?`;
  await pool.query(updateQuery, [
    scoutName,
    scoutEmail,
    scoutPassword,
    now,
    scoutId,
  ]);

  return true;
}

async function findScoutProfileImage(scoutId) {
  const pool = await database.getPool();
  const query = `SELECT scoutImage FROM scouts WHERE scoutId = ?`;
  const [scouts] = await pool.query(query, scoutId);

  return scouts[0];
}

async function uploadScoutProfileImagePlayer(scoutId, scoutImage) {
  const pool = await database.getPool();
  const updateQuery = `UPDATE scouts SET scoutImage = ? WHERE scoutId = ?`;
  await pool.query(updateQuery, [scoutImage, scoutId]);

  return true;
}
async function addVerificationCodeScout(scoutId, scoutVerificationCode) {
  const now = new Date();
  const pool = await database.getPool();
  const insertQuery = `
    UPDATE INTO scouts SET scoutVerificationCode = ?,
    scoutUpdatedAt = ?,
    scoutVerifiedAt = ?
    WHERE scoutId = ?
  `;
  const [created] = await pool.query(insertQuery, [
    scoutVerificationCode,
    now,
    now,
    scoutId,
  ]);

  return created.insertId;
}
async function getScoutByEmail(scoutEmail) {
  const pool = await database.getPool();
  const query = `SELECT scoutId, scoutEmail
  FROM scouts
  WHERE scoutEmail = ?`;
  const [scout] = await pool.query(query, scoutEmail);

  return scout[0];
}

module.exports = {
  addPlayer,
  activateValidationPlayer,
  addVerificationCodePlayer,
  findAllPlayers,
  findPlayerById,
  findPlayerProfileImage,
  removePlayerById,
  updatePlayerById,
  uploadPlayerProfileImagePlayer,
  loginPlayer,
  getPlayerByVerificationCode,
  getPlayerByEmail,
  addScout,
  activateValidationScout,
  addVerificationCodeScout,
  findAllScouts,
  findScoutById,
  findScoutProfileImage,
  removeScoutById,
  updateScoutById,
  uploadScoutProfileImagePlayer,
  loginScout,
  getScoutByVerificationCode,
  getScoutByEmail,
};
