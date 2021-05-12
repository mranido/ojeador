"use strict";
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");
const model = require("../../../infrastructure/mock-db");
const TABLE = "videos";

async function getLikes(req, res, next) {
  try {

    const {id} =req.params;
    const videoId = Number(id);  
    const getLike = videoId;

     const video = await model.findOne({ videoId }, TABLE);
     if (!video) {
       return response.error(req, res, "Video no existe", 400);
     }

    const connection = await getConnection();
    const getPositionQuery = `SELECT count(1) as Likes
                             FROM videoLikes
                                    WHERE videoLikeVideoId = ?`;
    const [results] = await connection.execute(getPositionQuery, [getLike]);


    connection.release();

    if (results.length === 0) {
      return response.error(req, res, "No hay ningún like", 404);
    }

    return response.success(req, res, results, 201);
  } catch (error) {
    next(error);
  }
}

module.exports = getLikes;
