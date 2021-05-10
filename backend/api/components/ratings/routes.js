"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

router
  .post("/user/:id/", controller.createRating)
  .get("/user/:id/", controller.getRating)
  .get("/user/:id/avgrating/", controller.getAverageRating);

module.exports = router;
