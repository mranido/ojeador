"use strict";

const createRating = require("./create-rating");
const getRating = require("./get-rating");
const getAverageRating = require("./get-average-rating-by-id");
const getAllAverageRating = require("./get-all-average");
module.exports = {
  createRating,
  getRating,
  getAverageRating,
  getAllAverageRating,
};
