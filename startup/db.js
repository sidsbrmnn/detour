const { connect } = require("mongoose");

const DB_URI = process.env.DB_URI;

module.exports = function() {
  connect(
    DB_URI,
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
  ).then(() => console.info("Connected to MongoDB"));
};
