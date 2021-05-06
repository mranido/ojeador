"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

//const { updatePlayer } = require("../controllers/users/update-user");
// const {
//   uploadImageProfile,
// } = require("../controllers/users/upload-image-profile");
// const { getPlayerProfile } = require("../controllers/users/get-user-profile");

const accessAuth = require("../../middlewares/access-auth");
const validateAuth = require("../../middlewares/validate-auth");

//Publicas
///api/v1/users

router
  .post("/register", controller.register)
  .get("/:id/activation", controller.activation)
  .post("/login", controller.login);
// .get("/profiles/:id", controller.get_profile)
// // .put("/profiles/update/:id", controller.update_profile)
// .delete("/profiles/delete/:id", controller.remove);

// .delete("/profiles/delete/:id", accessAuth.onlyPlayers, controller.remove)

//Privadas
//router;
// .post("/login", controller.login)
// .delete("/profiles/delete/:id", accessAuth.decodedToken, controller.remove);

// router.route("/:id").all(validateAuth).delete(deleteUserById);
// router.route("/:id/reviews").all(validateAuth).get(getUserReviewsById);
// router.route("/profile").all(validateAuth);
// router.route("/upload").all(validateAuth).post(uploadImageProfile);

module.exports = router;
