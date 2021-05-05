"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

//const { updatePlayer } = require("../controllers/users/update-user");
// const {
//   uploadImageProfile,
// } = require("../controllers/users/upload-image-profile");
// const { getPlayerProfile } = require("../controllers/users/get-user-profile");

const validateAuth = require("../../middlewares/validate-auth");
const accessAuth = require("../../middlewares/access-auth");

//Publicas
///api/v1/users

router
  .post("/register", controller.register)
  .get("/activation", controller.activation)
  .get("/profiles/:id", controller.get_profile)
  .delete("/profiles/delete/:id", controller.remove)
  .post("/login", controller.login);

// .delete("/profiles/delete/:id", accessAuth.onlyPlayers, controller.remove)

//Privadas
// router.route("/").all(validateAuth).get(getUsers).put(updateUser);
// router.route("/:id").all(validateAuth).delete(deleteUserById);
// router.route("/:id/reviews").all(validateAuth).get(getUserReviewsById);
// router.route("/profile").all(validateAuth);
// router.route("/upload").all(validateAuth).post(uploadImageProfile);

module.exports = router;
