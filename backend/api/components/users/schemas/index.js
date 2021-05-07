"use strict";

const register = require("./register");
const login = require("./login");
const updateData = require("./update-player");
const remove =  require("./delete")

module.exports = { register, login, updateData, remove };
