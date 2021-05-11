"use strict";

const usersRouter = require("../components/users/routes");
const videosRouter = require("../components/videos/routes");
const contactsRouter = require("../components/contacts/routes");
const ratingsRouter = require("../components/ratings/routes");
const filtersRouter = require("../components/filters/routes")
const errorHandler = require("../errors/error-handler");
const routerx = require("express-promise-router");
const router = routerx();

router
.use("/api/v1/users/", usersRouter)
.use("/api/v1/videos/", videosRouter)
.use("/api/v1/contact/", contactsRouter)
.use('/api/v1/ratings/', ratingsRouter)
.use('/api/v1/filters', filtersRouter)

  //la funcion not_found y previous siempre tienen que ir de ultimo, sino no acceso a la ruta especificada
  .use(errorHandler.not_found)
  .use(errorHandler.previous);

module.exports = router;
