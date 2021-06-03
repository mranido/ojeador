"use strict";

const cryptoRandomString = require("crypto-random-string");
const path = require("path");
const fs = require("fs");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const TABLE = "videos";

const validExtensions = [".mp4"];

async function uploadVideo(req, res, next) {
  try {
    const { id } = req.params;

    const videoIdUser = Number(id);
    // Las imagenes vienen dentro de la cabecera req en el objeto files
    // Comprobamos q existe alguna imagen

    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      return response.error(
        req,
        res,
        "No se ha seleccionado ningún fichero",
        400
      );
    }
    console.log('Ese es el video', files);
    // profileImage es el nombre que enviamos desde el postman,
    // si enviamos
    const { profileVideo } = files;
    const extension = path.extname(profileVideo.name);
    if (!validExtensions.includes(extension)) {
      return response.error(req, res, "FORMATO NO VÁLIDO", 409);
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_VIDEOS } = process.env;

    // Cogemos la imagen de perfil original

    // Generamos la ruta completa a la carpeta donde situamos las imagenes de perfil
    const pathVideoFolder = `${__dirname}/../../../../public/${PATH_USER_VIDEOS}`;
    console.log(__dirname);

    const random = cryptoRandomString({ length: 10, type: "alphanumeric" });
    const videoName = `${videoIdUser}-${random}${extension}`;
    // Path de la nueva imagen de perfil
    const pathVideo = `${pathVideoFolder}/${videoName}`;
    //const pathImage = `${pathProfileImageFolder}/${id}${extension}`;

    // Movemos la image a la ruta final /public/images/profiles/14-adfa324d.png
    profileVideo.mv(pathVideo, async function (err) {
      if (err) res.status(500).send(err);
      await model.create({ videoIdUser, videoUrl: videoName }, TABLE);

      return response.success(
        req,
        res,
        { url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_VIDEOS}/${videoName}` },
        201
      );
    });
  } catch (error) {
    next(error);
  }
}

module.exports = uploadVideo;
