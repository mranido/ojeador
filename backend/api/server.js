"user strict";

const config = require("./config");
const app = require("./app");
const chalk = require("chalk");

const serverInfo = () => {
  console.log(
    chalk.blue(
      `🏁  Server running on : ${config.api.host}:${config.api.port} 🏁`
    )
  );
};

function runServer() {
  app.listen(config.api.port, serverInfo());
}
runServer();
