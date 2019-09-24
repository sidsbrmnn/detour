const Joi = require("@hapi/joi");
const { sign } = require("jsonwebtoken");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  password: { type: String, required: true }
});

userSchema.methods.genToken = function() {
  const token = sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email
    },
    process.env.JWT_SECRET
  );

  return token;
};

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(20)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    photo: Joi.string(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

function validateLogin(user) {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

const User = model("User", userSchema);

module.exports = { User, validateUser, validateLogin };
