"use strict";
const Joi = require("joi");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const getConnection = require("../../../infrastructure/database");
const TABLE = "videoLikes";
const TABLE2 = "videos";

async function videoLike(req, res, next) {
  try {
    const { id } = req.params;
    const videoId = Number(id);

    const { videoLikeVideoId, videoLikeUserId } = req.body;

    const video = await model.findOne({ videoId }, TABLE2);
    if (!video) {
      return response.error(req, res, "Video no existe", 400);
    }
    const videoDB = {
      videoLikeVideoId: videoId,
      videoLikeUserId,
    };
    const connection = await getConnection();
    const getVotante = `SELECT *
                        FROM videoLikes
                        WHERE videoLikeVideoId = ?
                        AND videoLikeUserId = ?`;
    const [results] = await connection.execute(getVotante, [videoId, videoLikeUserId]);
    connection.release();
    if (results.length !== 0){
        return response.error(req, res, "Ya has dado me gusta", 400);
    }
    const createALike = await model.create(videoDB, TABLE);
    
    response.success(req, res, "like creado", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = videoLike;
