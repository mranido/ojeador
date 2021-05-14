"use strict";
const Joi = require("joi");

const rate = Joi.object({
  ratingValue: Joi.number().min(1).max(5).messages({
    "number.min": "El campo valor tiene que tener como minimo 1 estrella",
    "number.max": "El campo valor tiene que tener como máximo 5 estrellas",
  }),
  ratingIdVoteUser: Joi.number(),
  ratingPositionSkillId: Joi.number(),
  ratingCreatedAt: Joi.date(),
});

const createRating = (request, response, next) => {
  let result = rate.validate(request.body, {
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

module.exports = createRating;
