const { verify } = require("jsonwebtoken");
const { pick } = require("lodash");

const asyncHandler = require("../middlewares/async");
const { User } = require("../models/user");

module.exports = asyncHandler(async function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  let decoded;

  try {
    decoded = verify(token, process.env.JWT_SECRET);
  } catch (ex) {
    return res.status(400).send("Invalid token.");
  }

  const user = await User.findOne(pick(decoded, ["_id", "name", "email"]));
  if (!user) return res.status(400).send("Invalid token.");

  res.user = decoded;

  next();
});
