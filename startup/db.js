const { connect } = require("mongoose");

module.exports = function() {
  connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
  ).then(() => console.info("Connected to MongoDB"));
};
