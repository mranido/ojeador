"use strict";

const express = require("express");
const router = express.Router();
const { activatePlayer } = require("../controllers/users/activation-account");
const { activateScout } = require("../controllers/users/activation-account");
//const { getPlayers } = require("../controllers/users/get-users");
const { loginJugador } = require("../controllers/users/login-player");
const { loginOjeador } = require("../controllers/users/login-player");
const { registerPlayer } = require("../controllers/users/register-player");
const { registerScout } = require("../controllers/users/register-player");
//const { updatePlayer } = require("../controllers/users/update-user");
// const {
//   uploadImageProfile,
// } = require("../controllers/users/upload-image-profile");
// const { getPlayerProfile } = require("../controllers/users/get-user-profile");
// const { deletePlayerById } = require("../controllers/users/delete-user-by-id");
const validateAuth = require("../middlewares/validate-auth");

//Publicas
///api/v1/users
router.route("/register/player").post(registerPlayer);
router.route("/login/player").post(loginJugador);
router.route("/activation/player").get(activatePlayer);
router.route("/register/scout").post(registerScout);
router.route("/login/scout").post(loginOjeador);
router.route("/activation/scout").get(activateScout);

//Privadas
// router.route("/").all(validateAuth).get(getUsers).put(updateUser);
// router.route("/:id").all(validateAuth).delete(deleteUserById);
// router.route("/:id/reviews").all(validateAuth).get(getUserReviewsById);
// router.route("/profile").all(validateAuth).get(getUserProfile);
// router.route("/upload").all(validateAuth).post(uploadImageProfile);

module.exports = router;
