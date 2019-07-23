const express = require("express");

const Tour = require("../models/tour");

const router = express.Router();

router.get("/", async (req, res) => {
  const tours = await Tour.find({}).sort("name");

  res.send(tours);
});

router.post("/", async (req, res) => {
  let tour = await Tour.findOne({ name: req.body.name });
  if (tour)
    return res.status(400).send("Tour with the given name already exists.");

  tour = new Tour(req.body);
  await tour.save();

  res.send(tour);
});

router.patch("/:id", async (req, res) => {
  const tour = await Tour.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });
  if (!tour)
    return res.status(404).send("Tour with the given ID was not found.");

  res.send(tour);
});

module.exports = router;
