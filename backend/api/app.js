"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
//Subo ficheros
app
  // LOG con Morgan
  .use(morgan("combined", { stream: accessLogStream }))

  //Permiso de acceso a otras URLS
  .use(cors())

  .use(fileUpload())

  //Recibo datos como json en el body;
  .use(express.json(express.urlencoded({ extended: false })))

  //Muestro ficheros en carpeta Public
  .use(express.static("public"))

  .use("/", router);

module.exports = app;
