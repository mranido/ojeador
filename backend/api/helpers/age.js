"use strict";

const moment = require("moment");

const years = (userBirthday) => {
  let edad = moment().diff(userBirthday, "years");
  if (edad >= 10 && edad < 12) {
    return "Alevín (10-11)";
  } else if (edad >= 12 && edad <= 13) {
    return "Infantil (12-13)";
  } else if (edad >= 14 && edad <= 15) {
    return "Cadete (14-15)";
  } else if (edad >= 16 && edad <= 18) {
    return "Juvenil (16-18)";
  } else {
    return "Edad no válida";
  }
};


module.exports = {years};



