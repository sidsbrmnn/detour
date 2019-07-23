const express = require("express");

const asyncHandler = require("../middlewares/async");
const { objectId } = require("../middlewares/validate");
const Tour = require("../models/tour");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tours = await Tour.find({}).sort("name");

    res.send(tours);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    let tour = await Tour.findOne({ name: req.body.name });
    if (tour)
      return res.status(400).send("Tour with the given name already exists.");

    tour = new Tour(req.body);
    await tour.save();

    res.send(tour);
  })
);

router.patch(
  "/:id",
  objectId,
  asyncHandler(async (req, res) => {
    const tour = await Tour.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (!tour) return res.status(404).send("Invalid Id.");

    res.send(tour);
  })
);

router.delete(
  "/:id",
  objectId,
  asyncHandler(async (req, res) => {
    const tour = await Tour.findOneAndDelete({ _id: req.params.id });
    if (!tour) return res.status(404).send("Invalid Id.");

    res.send(tour);
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const tour = await Tour.findOne({ slug: req.params.slug });
    if (!tour) return res.status(404).send("Tour not found.");

    res.send(tour);
  })
);

module.exports = router;
