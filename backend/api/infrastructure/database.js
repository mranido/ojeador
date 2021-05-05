"use strict";

const mysql = require("mysql2/promise");
const config = require("../config");

let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      database: config.db.name,
      user: config.db.user,
      password: config.db.password,
      timezone: config.db.timezone,
    });
  }
  console.log(pool);
  return pool;
}

module.exports = { getPool };
