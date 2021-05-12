"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

router
  .get("/age/:age", controller.filterAge)
  .get("/position/:position", controller.filterPosition)
  .get("/team/:team", controller.filterTeam)

module.exports = router;
