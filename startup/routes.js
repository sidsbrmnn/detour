const { json } = require("express");
const tours = require("../routes/tours");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(json());
  app.use("/api/tours", tours);
  app.use("/api/users", users);
  app.all("*", (req, res) => res.status(404).send());
};
