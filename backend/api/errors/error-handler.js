"use strict";

module.exports = {
  previous: (error, req, res, next) => {
    res.status(res.httpCode || 500).send({
      message:
        error.message ||
        `Ha ocurrido un error en el servidor , por favor contacte con el administrador: ${ADMIN_EMAIL}`,
    });
    console.log(` [ ${error.message || error} ]`);
  },
  not_found: (req, res) => {
    // message json for client
    res.status(404).send({
      errorCode: 404,
      message: "Pagina no encontrada",
      comment: "¿Te has perdido?",
    });
    console.log(` [ ${error.message || error} ]`);
  },
};
