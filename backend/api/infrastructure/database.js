"use strict";

const mysql = require("mysql2/promise");
const config = require("../config");

let pool;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(config.db);
  }
  return await pool.getConnection();
}

module.exports = getConnection;
