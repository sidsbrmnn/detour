const { genSalt, hash, compare } = require("bcryptjs");
const express = require("express");
const { pick } = require("lodash");

const asyncHandler = require("../middlewares/async");
const { User, validateUser, validateLogin } = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send("User with the given mail ID already exists. Please login.");

    user = new User(pick(req.body, ["name", "email", "password"]));
    const salt = await genSalt(10);
    user.password = await hash(req.body.password, salt);
    await user.save();

    const token = user.genToken();

    res
      .header("X-Auth-Token", token)
      .header("Access-Control-Expose-Headers", "X-Auth-Token")
      .send(pick(user, ["_id", "name", "email"]));
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email/password.");

    if (!(await compare(req.body.password, user.password)))
      return res.status(400).send("Invalid email/password.");

    const token = user.genToken();

    res
      .header("X-Auth-Token", token)
      .header("Access-Control-Expose-Headers", "X-Auth-Token")
      .send(pick(user, ["_id", "name", "email"]));
  })
);

module.exports = router;
