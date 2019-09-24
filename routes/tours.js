const express = require("express");

const asyncHandler = require("../middlewares/async");
const auth = require("../middlewares/auth");
const { objectId } = require("../middlewares/validate");
const { Tour, validateTour } = require("../models/tour");

const router = express.Router();

router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const tours = await Tour.find({}).sort("name");

    res.send(tours);
  })
);

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const { error } = validateTour(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
  [auth, objectId],
  asyncHandler(async (req, res) => {
    const { error } = validateTour(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tour = await Tour.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (!tour) return res.status(404).send("Invalid Id.");

    res.send(tour);
  })
);

router.delete(
  "/:id",
  [auth, objectId],
  asyncHandler(async (req, res) => {
    const tour = await Tour.findOneAndDelete({ _id: req.params.id });
    if (!tour) return res.status(404).send("Invalid Id.");

    res.send(tour);
  })
);

router.get(
  "/:slug",
  auth,
  asyncHandler(async (req, res) => {
    const tour = await Tour.findOne({ slug: req.params.slug });
    if (!tour) return res.status(404).send("Tour not found.");

    res.send(tour);
  })
);

module.exports = router;
