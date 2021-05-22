"use strict";
const Joi = require("joi");

const update = Joi.object({
  userName: Joi.string().min(5).max(255).messages({
    "string.min": "El campo name tiene que tener un minimo 5 carácteres",
    "string.max": "El campo name tiene que tener un máximo 255 carácteres",
    "string.name": "El campo userName es obligatorio",
  }),

  userEmail: Joi.string()
    .email()
    .pattern(new RegExp("^[.A-z0-9-_+]+@+[A-Za-z0-9-_=]+.[A-z]{3}$"))
    .messages({
      "string.email": "Debes introducir un email valido",
      "string.pattern.base": "El email no esta bien formado",
      "string.pattern.base": "El email no esta bien formado",
      "string.required": "El campo email es obligatorio",
    }),

  userPassword: Joi.string().min(4).max(20).messages({
    "string.min": "El campo password tiene que tener un minimo 4 carácteres",
    "string.max": "El campo password tiene que tener un máximo 20 carácteres",
  }),

  userLocation: Joi.string().max(60).messages({
    "string.max": "El campo location tiene que tener un máximo 60 carácteres",
  }),

  userTeam: Joi.string().min(4).max(100).messages({
    "string.min": "El campo Team tiene que tener un minimo 5 carácteres",
    "string.max": "El campo Team tiene que tener un máximo 100 carácteres",
  }),
  userPosition: Joi.valid(
    "Portero",
    "Defensa",
    "Mediocentro",
    "Delantero"
  ).messages({
    "string.min": "El campo password tiene que tener un minimo 5 carácteres",
    "string.max": "El campo password tiene que tener un máximo 100 carácteres",
  }),

  userNumber: Joi.number().min(1).max(99).positive().messages({
    "string.min": "El campo number tiene que tener un minimo 1 carácteres",
    "string.max": "El campo number tiene que tener un máximo 99 carácteres",
    "string.max": "El campo number tiene que ser positivo",
  }),

  userBirthday: Joi.date(),
  userDescription: Joi.string().max(500).messages({
    "string.max":
      "El campo description tiene que tener un máximo 500 carácteres",
  }),
});

const updateData = (request, response, next) => {
  let result = update.validate(request.body, {
    abortEarly: false,
  });

  if (result.error === undefined) {
    next();
  } else {
    const validationErrors = result.error.details.reduce((acc, error) => {
      acc.push(`${error.message}`);
      return acc;
    }, []);

    return response.status(400).send({
      message: validationErrors,
    });
  }
};

module.exports = updateData;
