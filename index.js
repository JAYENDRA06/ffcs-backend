const express = require("express");
const http = require("http");
const { sequelize } = require("./api/models/index");

(async () => {
  await sequelize.sync();
})();

require("dotenv").config();
const app = express();

const router = require("./api/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use(function (err, req, res, next) {
  res.status(err.status || 404).send("route doesn't exist");
});

const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, function () {
  // console.log(`Server is up on ${PORT}`);
});