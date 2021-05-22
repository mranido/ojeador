'use strict';

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");


const accessAuth = require("../../middlewares/accessAuth");


router
  .post("/user/:id", accessAuth.registred, controller.createVideo)
  .delete("/user/:id/:videoid", accessAuth.registred, controller.deleteVideo)
  .get("/", controller.getVideos)
  .post("/:id", accessAuth.registred, controller.createLike)
  .get("/:id", controller.getLikes);


module.exports = router;