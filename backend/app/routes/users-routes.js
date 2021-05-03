"use strict";

const express = require("express");
const router = express.Router();
const { activateUser } = require("../controllers/users/activation-account");
//const { getPlayers } = require("../controllers/users/get-users");
const { loginUser } = require("../controllers/users/login-user");
const { registerUser } = require("../controllers/users/register-user");
//const { updatePlayer } = require("../controllers/users/update-user");
// const {
//   uploadImageProfile,
// } = require("../controllers/users/upload-image-profile");
// const { getPlayerProfile } = require("../controllers/users/get-user-profile");
// const { deletePlayerById } = require("../controllers/users/delete-user-by-id");
const validateAuth = require("../middlewares/validate-auth");

//Publicas
///api/v1/users

router.route("/register/").post(registerUser);
router.route("/login/").post(loginUser);
router.route("/activation/").get(activateUser);

//Privadas
// router.route("/").all(validateAuth).get(getUsers).put(updateUser);
// router.route("/:id").all(validateAuth).delete(deleteUserById);
// router.route("/:id/reviews").all(validateAuth).get(getUserReviewsById);
// router.route("/profile").all(validateAuth).get(getUserProfile);
// router.route("/upload").all(validateAuth).post(uploadImageProfile);

module.exports = router;
