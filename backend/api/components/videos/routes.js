'use strict';

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

//const { updatePlayer } = require("../controllers/users/update-user");
// const {
//   uploadImageProfile,
// } = require("../controllers/users/upload-image-profile");
// const { getPlayerProfile } = require("../controllers/users/get-user-profile");

const accessAuth = require("../../middlewares/accessAuth");

//Publicas
///api/v1/users

router
  .post("/user/:id", controller.createVideo)
  .delete("/user/:id/:videoid", controller.deleteVideo)
  .get("/", controller.getVideos)
  .post("/:id", controller.createLike)
  .get("/:id", controller.getLikes);


module.exports = router;