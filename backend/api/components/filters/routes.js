"use strict";

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

router
  .get("/category/:category", controller.filterCategory)
  .get("/position/:position", controller.filterPosition)
  .get("/team/:team", controller.filterTeam)
  .get("/skills/:skills", controller.filterSkills)
  .get("/skills/:skills/rating/:ratings", controller.filterSkillbyRating)

module.exports = router;
