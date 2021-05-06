"use strict";

const activationAccount = require("./activation-account");
const deleteUserById = require("./delete-user-by-id");
const getUsersProfile = require("./get-users-profile");
const loginUser = require("./login-user");
const registerUser = require("./register-user");
const updatePlayer = require("./update-player-profile-by-id");

module.exports = {
  activation: activationAccount,
  remove: deleteUserById,
  get_profile: getUsersProfile,
  login: loginUser,
  register: registerUser,
  update: updatePlayer,
};
