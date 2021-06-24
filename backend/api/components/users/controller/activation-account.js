"use strict";
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const { sendEmailCorrectValidation } = require("../../../helpers/mail-smtp");
const TABLE = "users";

async function activateUser(req, res, next) {
  try {
    const { verification_code: userVerificationCode } = req.query;
    const { id } = req.params;
    const userId = id;
    console.log(req.params, "Este es el id", userId);

    if (!userVerificationCode) {
      return response.error(req, res, "Código de verificación no válido", 400);
    }

    const activatedLink = {
      userVerifiedAt: new Date(),
      userVerificationCode: null,
    };
    const isActivated = await model.update(activatedLink, TABLE, userId);

    if (!isActivated) {
      res.send({
        message: "Cuenta no verificada, código de verificación expirado.",
      });
    }

    const dataEmail = await model.findOne({ userId }, TABLE);
    const { userName, userEmail } = dataEmail;
    await sendEmailCorrectValidation(userName, userEmail);

    res.send(
      `Tu cuenta ha sido activada correctamente. En unos segundos recibirás un email de confirmación para poder disfrutar de nuestros servicios`
    );
  } catch (error) {
    next(error);
  }
}

module.exports = activateUser;
