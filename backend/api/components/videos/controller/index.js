"use strict";

const uploadVideo = require("./create-video");
const deleteVideoById = require("./delete-video");
const getAllVideos = require("./get-all-videos");
const createVideoLike = require("./video-like")
const getLikes = require('./get-video-like');


module.exports = {
  createVideo: uploadVideo,
  deleteVideo: deleteVideoById,
  getVideos: getAllVideos,
  createLike : createVideoLike,
  getLikes
};


