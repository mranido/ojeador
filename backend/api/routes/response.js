'use strict';

module.exports = {
  success: (req, res, message, status) => {
    let  statusCode = status || 200;

    res.status(statusCode).send({
      status: status,
      body: message || "La peticion se realizó con éxito",
      error: false,
    });
  },
  error: (req, res, message, status) => {
    let statusCode = status || 500;
    let StatusMessage = message || "Ha ocurrido un error en el servidor";

    res.status(statusCode).send({
      status: status,
      body: false,
      error: StatusMessage,
    });
  },
};