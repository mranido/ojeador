"use strict";

const model = require("../../../infrastructure/mock-db");
const getConnection = require("../../../infrastructure/database");
const response = require("../../../routes/response");

async function getContactById(req, res, next) {
  try {
    let { userId } = req.auth;
    const contactPlayerId = req.params.id;
    userId = contactPlayerId;

    const contactId = req.params.contactId;

    const connection = await getConnection();
    const getPositionQuery = `SELECT *
                                    FROM contacts
                                    WHERE contactId = ?
                                    and contactPlayerId = ?`;
    const [results] = await connection.execute(getPositionQuery, [
      contactId,
      contactPlayerId,
    ]);
    connection.release();
    return response.success(req, res, results, 201);
  } catch (error) {
    next(error);
  }
}
module.exports = getContactById;
