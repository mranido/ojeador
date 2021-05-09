'use strict';

const routerx = require("express-promise-router");
const router = routerx();
const controller = require("./controller");

router.post("/user/:id/contact/", controller.createContact)
    .post("/user/:id/contact/:contactid", controller.acceptContact)
    .delete("/user/:id/contact/:contactid", controller.rejectContact)


module.exports = router;