"use strict";

const moment = require("moment");

const years = (userBirthday) => {
  let edad = moment().diff(userBirthday, "years");
  if (edad >= 10 && edad < 12) {
    return "Alevin";
  } else if (edad >= 12 && edad <= 13) {
    return "Infantil";
  } else if (edad >= 14 && edad <= 15) {
    return "Cadete";
  } else if (edad >= 16 && edad <= 18) {
    return "Juvenil";
  } else {
    return "Edad no válida";
  }
};


module.exports = {years};



