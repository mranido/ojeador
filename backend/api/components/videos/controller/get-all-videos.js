const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const TABLE = "videos";
const response = require("../../../routes/response");

async function getallVideos(req, res, next) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL

    const videos = await model.findAll(TABLE);
    if (videos === [] || !videos) {
      return response.error(req, res, "No hay videos", 409);
    }

    res.status(200).send(videos);
  } catch (error) {
    next(error);
  }
}

module.exports = getallVideos;
