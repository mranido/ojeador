"use strict";

const routerx = require("express-promise-router");
const schema = require("./schemas");
const router = routerx();
const controller = require("./controller");

router
  .post("/user/:id/", schema.createRating, controller.createRating)
  .get("/user/:id/", controller.getRating)
  .get("/user/:id/avgrating/", controller.getAverageRating);

module.exports = router;
