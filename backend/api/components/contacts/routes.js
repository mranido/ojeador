"use strict";

const routerx = require("express-promise-router");
const accessAuth = require("../../middlewares/accessAuth");
const router = routerx();
const controller = require("./controller");

router
  .post("/user/:id", accessAuth.onlyScout, controller.createContact)
  .put(
    "/user/:id/accept/:contactid",
    accessAuth.registred,
    controller.acceptContact
  )
  .put(
    "/user/:id/reject/:contactid",
    accessAuth.registred,
    controller.rejectContact
  )
  .get("/scout/:id", accessAuth.registred, controller.getScoutContact)
  .get("/player/:id", accessAuth.registred, controller.getPlayerContact)
  .get("/:id/:contactId", accessAuth.registred, controller.getContactById);
module.exports = router;
