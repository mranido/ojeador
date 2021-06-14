"use strict";

const model = require("../../../infrastructure/mock-db");
const getConnection = require("../../../infrastructure/database");
const response = require("../../../routes/response");

async function getPlayerContact(req, res, next) {
  try {
    let { userId, userRol } = req.auth;
    userId = req.params.id;
    const playerId = userId;

    const connection = await getConnection();
    const getContactsByPlayerId = `select  a.*, d.* from (SELECT contacts.contactId as contactId, contacts.contactTitle as contactTitle ,contacts.contactPlayerId as playerId, contacts.contactScoutId as scoutId, contacts.contactDescription as message, contacts.contactStatus as contactStatus, users.userImage as userImage,  users.userName as userName, users.userNumber as userNumber FROM contacts  inner join users  on contacts.contactPlayerId = users.userId) a  inner join 
(SELECT contacts.contactId as contactId, users.userImage as scoutImage, users.userName as scoutName,users.userTeam as scoutTeam, contacts.contactPlayerId as playerId FROM contacts   inner join users  on contacts.contactScoutId = users.userId) d on (a.playerId = d.playerId) and a.contactId = d.contactId and a.playerId = ?
group by a.contactId, d.contactId`;
    const [results] = await connection.execute(getContactsByPlayerId, [
      playerId,
    ]);
    connection.release();

    res.send(results).status(201);
  } catch (error) {
    next(error);
  }
}
module.exports = getPlayerContact;
