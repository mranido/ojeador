"use strict";
const getConnection = require("../../../infrastructure/database");

async function getallVideos(req, res, next) {
  try {
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL

    const connection = await getConnection();
    const getAllVideos = `select a.*, b.* , truncate(avg(t2.ratingValue),1) avgMedia from users as a left join videos as b
    on a.userId = b.videoIduser left join ratings t2 ON a.userId = t2.ratingIdUser
    where a.userRol= "Player"
    and b.videoUrl  is not null
group by a.userId, b.videoId;  `;
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
