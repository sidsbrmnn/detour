const express = require("express");

const asyncHandler = require("../middlewares/async");
const { User, validateUser } = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User(req.body);
    await user.save();

    res.send(user);
  })
);

module.exports = router;
