"use strict";

const moment = require("moment");

const years = (userAge) => {
  if (userAge >= 4 && userAge < 6) {
    return "Prebenjamin";
  } else if (userAge >= 6 && userAge < 8) {
    return "Benjamin";
  } else if (userAge >= 10 && userAge < 12) {
    return "Alevin";
  } else if (userAge >= 12 && userAge < 14) {
    return "Cadete";
  } else if (userAge >= 14 && userAge < 16) {
    return "Infantil";
  } else if (userAge >= 16 && userAge <= 18) {
    return "Juvenil";
  } else {
    return "Edad no válida";
  }
};

module.exports = { years };
