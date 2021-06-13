"use strict";

const createContact = require("./create-contact");
const acceptContact = require("./accept-contact");
const rejectContact = require("./reject-contact");
const getPlayerContact = require("./get-player-contact");
const getScoutContact = require("./get-scout-contact");

module.exports = {
  createContact,
  acceptContact,
  rejectContact,
  getPlayerContact,
  getScoutContact,
};
