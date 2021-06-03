"use strict";

const activationAccount = require("./activation-account");
const deleteUserById = require("./delete-user-by-id");
const getUsersProfile = require("./get-users-profile");
const loginUser = require("./login-user");
const registerUser = require("./register-user");
const updatePlayer = require("./update-player-profile-by-id");
const removeUser = require("./delete-user-by-id");
const updateProfileImage = require("./update-user-profile-image")
const getAllUsersProfile = require('./get-all-profile');
const updateScout = require("./update-scout-profile");

module.exports = {
  activation: activationAccount,
  remove: deleteUserById,
  get_profile: getUsersProfile,
  login: loginUser,
  register: registerUser,
  updatePlayer,
  updateScout,
  remove: removeUser,
  updateImage : updateProfileImage,
  get_all_profile: getAllUsersProfile,
};
