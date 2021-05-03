"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();

//Subo ficheros
app.use(fileUpload());
//Muestro ficheros en carpeta Public
app.use(express.static("public"));
//Recibo datos como json en el body;
app.use(express.json());
//Permiso de acceso a otras URLS
app.use(cors());

//Defino Rutas

const usersRouter = require("./app/routes/users-routes");
// const videosRouter = require("./app/routes/videos-routes");
// const rolsRouter = require("./app/routes/rols-routes");
// const contactsRouter = require("./app/routes/contacts-routes");

//

const port = process.env.SERVER_PORT || 3000;

//// LOG con Morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

//Usar Rutas

app.use("/api/v1/users/", usersRouter);

//

app.listen(port, () => console.log(`Escuchando puerto ${port}`));
