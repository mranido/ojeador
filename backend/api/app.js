"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const app = express();
const bodyParser = require("body-parser").json();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
//Subo ficheros

// LOG con Morgan
app.use(morgan("combined", { stream: accessLogStream }));

//Permiso de acceso a otras URLS
app.use(cors());

app.use(fileUpload());

//Recibo datos como json en el body;
app.use(express.json(express.urlencoded({ extended: true })));

//Muestro ficheros en carpeta Public
app.use(express.static("public"));

app.use("/", router);

module.exports = app;
