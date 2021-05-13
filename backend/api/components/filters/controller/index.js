"use strict";

const filterCategory = require("./filter-by-age");
const filterPosition = require("./filter-by-position");
const filterTeam = require("./filter-by-team");
const filterSkills = require("./filter-by-skills");
const filterSkillbyRating = require("./filter-by-skills-and-rating");


module.exports = { filterCategory, filterPosition, filterTeam, filterSkills, filterSkillbyRating };
