"use strict";

const model = require("../../../infrastructure/mock-db");
const getConnection = require("../../../infrastructure/database");
const response = require("../../../routes/response");

async function getContactById(req, res, next) {
  try {
    let { userId } = req.auth;
    userId = req.params.id;

    const contactId = req.params.contactId;

    const connection = await getConnection();
    const getContactById = `select  a.*, d.* from (SELECT contacts.contactId as contactId,contacts.contactPlayerId as playerId, contacts.contactScoutId as scoutId, contacts.contactDescription as message, contacts.contactStatus as contacSstatus, users.userImage as userImage, users.userName as userName, users.userNumber as userNumber FROM contacts  inner join users  on contacts.contactPlayerId = users.userId) a  inner join 
(SELECT contacts.contactId as contactId, users.userImage as scoutImage, users.userName as scoutName, contacts.contactPlayerId as playerId FROM contacts   inner join users  on contacts.contactScoutId = users.userId) d on (a.playerId = d.playerId) and a.contactId = d.contactId and a.contactId = ?
group by a.contactId, d.contactId`;
    const [results] = await connection.execute(getContactById, [contactId]);
    connection.release();
    return response.success(req, res, results, 201);
  } catch (error) {
    next(error);
  }
}
module.exports = getContactById;
