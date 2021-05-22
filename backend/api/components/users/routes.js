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
  .put(
    "/profiles/update/:id",
    accessAuth.registred,
    schema.updateData,
    controller.update
  )
  .delete("/profiles/delete/:id", accessAuth.registred, controller.remove)
  .post("/profiles/upload/:id/", accessAuth.registred, controller.updateImage);

module.exports = router;
