const express = require("express");

const Tour = require("../models/tour");

const router = express.Router();

router.get("/", async (req, res) => {
  const tours = await Tour.find({}).sort("name");

  res.send(tours);
});

module.exports = router;
