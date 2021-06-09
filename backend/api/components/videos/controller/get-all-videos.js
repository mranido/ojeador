"use strict";
const getConnection = require("../../../infrastructure/database");

async function getallVideos(req, res, next) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL

    const connection = await getConnection();
    const getAllVideos = `select a.*, b.* from users as a, videos as b
    where a.userId = b.videoIduser `;
    const [videos] = await connection.execute(getAllVideos);
    connection.release();
    if (videos.length === 0) {
      return response.error(req, res, "No hay vídeos", 404);
    }

    res.status(200).send(videos);
  } catch (error) {
    next(error);
  }
}

module.exports = getallVideos;
