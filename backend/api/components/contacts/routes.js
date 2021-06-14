"use strict";

const routerx = require("express-promise-router");
const accessAuth = require("../../middlewares/accessAuth");
const router = routerx();
const controller = require("./controller");

router
  .post("/user/:id", accessAuth.onlyScout, controller.createContact)
  .post(
    "/user/:id/contact/:contactid",
    accessAuth.registred,
    controller.acceptContact
  )
  .delete(
    "/user/:id/contact/:contactid",
    accessAuth.registred,
    controller.rejectContact
  )
  .get("/scout/:id/", accessAuth.registred, controller.getScoutContact)
  .get("/player/:id/", accessAuth.registred, controller.getPlayerContact)
  .get("/:id/:contactId", accessAuth.registred, controller.getContactById);
module.exports = router;
