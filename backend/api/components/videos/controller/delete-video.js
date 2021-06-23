"use strict";

const model = require("../../../infrastructure/mock-db");
const TABLE = "videos";
const response = require("../../../routes/response");

async function deleteVideoById(req, res, next) {
  try {
    const { videoid: videoId } = req.params;

    const video = await model.findOne({ videoId }, TABLE);

    if (!video) {
      return response.error(req, res, "No hay video", 409);
    }

    await model.delete({ videoId }, TABLE);

    response.success(req, res, "video borrado correctamente", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = deleteVideoById;
