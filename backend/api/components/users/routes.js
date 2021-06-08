"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");
const schema = require("./schemas");

//const { updatePlayer } = require("../controllers/users/update-user");
// const {
//   uploadImageProfile,
// } = require("../controllers/users/upload-image-profile");
// const { getPlayerProfile } = require("../controllers/users/get-user-profile");

const accessAuth = require("../../middlewares/accessAuth");

//Publicas
///api/v1/users

router
  .post("/register", controller.register)
  .get("/:id/activation", controller.activation)
  .post("/login", controller.login)
  .get("/profiles/:id", controller.get_profile)
  .get("/skills/:id", controller.getSkills)
  .put(
    "/profiles/update_player/:id",
    accessAuth.registred,
    schema.updateDataPlayer,
    controller.updatePlayer
  )
  .put(
    "/profiles/update_scout/:id",
    accessAuth.onlyScout,
    schema.updateDataScout,
    controller.updateScout
  )
  .get("/profiles", controller.get_all_profile)
  .delete("/profiles/delete/:id", accessAuth.registred, controller.remove)
  .post(
    "/profiles/upload-photo/:id",
    accessAuth.registred,
    controller.updateImage
  );

module.exports = router;
