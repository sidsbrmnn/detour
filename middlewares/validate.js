const { Types } = require("mongoose");

exports.objectId = function(req, res, next) {
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Id.");

  next();
};
