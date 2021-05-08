"use strict";

const uploadVideo = require("./create-video");
const deleteVideoById = require("./delete-video");
const getAllVideos = require("./get-all-videos");


module.exports = {
  createVideo: uploadVideo,
  deleteVideo: deleteVideoById,
  getVideos: getAllVideos,
};


