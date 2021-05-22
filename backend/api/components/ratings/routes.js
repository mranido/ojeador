"use strict";

const routerx = require("express-promise-router");
const schema = require("./schemas");
const router = routerx();
const controller = require("./controller");
const accessAuth = require("../../middlewares/accessAuth");

router
  .post("/user/:id/", accessAuth.registred, schema.createRating, controller.createRating)
  .get("/user/:id/", controller.getRating)
  .get("/user/:id/avgrating/", controller.getAverageRating);

module.exports = router;
