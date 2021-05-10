"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

router
  .post("/user/:id/", controller.createRating)


module.exports = router;
