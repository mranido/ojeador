"use strict";

const register = require("./register");
const login = require("./login");
const updateDataPlayer = require("./update-player");
const updateDataScout = require("./update-scout");
const remove =  require("./delete")

module.exports = { register, login, updateDataPlayer, updateDataScout, remove };
