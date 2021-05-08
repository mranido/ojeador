"use strict";

const cryptoRandomString = require("crypto-random-string");
const path = require("path");
const fs = require("fs");
const model = require("../../../infrastructure/mock-db");
const response = require("../../../routes/response");
const config = require("../../../config");
const TABLE = "users";

const validExtensions = [".jpeg", ".jpg", ".png"];

async function uploadImageProfile(req, res, next) {
  try {
    const { id } = req.params;
    const userId = Number(id);
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

    // profileImage es el nombre que enviamos desde el postman,
    // si enviamos
    const { profileImage } = files;
    const extension = path.extname(profileImage.name);
    if (!validExtensions.includes(extension)) {
      return response.error(req, res, "FORMATO NO VÁLIDO", 409);
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

    // Cogemos la imagen de perfil original
    const user = await model.findOneAndFilter({ userId }, TABLE);
    const { userImage } = user;
    
    // Generamos la ruta completa a la carpeta donde situamos las imagenes de perfil
    const pathProfileImageFolder = `${__dirname}/../../../../public/${PATH_USER_IMAGE}`;
    console.log(__dirname);
    // Borramos la imagen original si existe
    if (userImage) {
       fs.unlink(`${pathProfileImageFolder}/${userImage}`, () => {
        console.log("Borrada imagen de perfil correctamente");
      });
    }

    const random = cryptoRandomString({ length: 10, type: "alphanumeric" });
    const imageName = `${userId}-${random}${extension}`;
    // Path de la nueva imagen de perfil
    const pathImage = `${pathProfileImageFolder}/${imageName}`;
    //const pathImage = `${pathProfileImageFolder}/${id}${extension}`;

    // Movemos la image a la ruta final /public/images/profiles/14-adfa324d.png
    profileImage.mv(pathImage, async function (err) {
      if (err) res.status(500).send(err);
      await model.update1({ userImage: imageName }, TABLE, {
        userId: userId,
      });

      return response.success(req, res,{url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${imageName}`} , 201);
      
    });
  } catch (error) {
    next(error);
  }
}

module.exports = uploadImageProfile;
