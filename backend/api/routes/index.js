"use strict";

const usersRouter = require("../components/users/routes");
const errorHandler = require("../errors/error-handler");
const routerx = require("express-promise-router");
const router = routerx();

router
  .use("/api/v1/users/", usersRouter)

  //la funcion not_found y previous siempre tienen que ir de ultimo, sino no acceso a la ruta especificada
  .use(errorHandler.not_found)
  .use(errorHandler.previous);

module.exports = router;
