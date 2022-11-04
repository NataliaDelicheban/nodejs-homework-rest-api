const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleSaveErrors} = require("../helpers")

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: "",
      },
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const signupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  token: Joi.string(),
});

const schemas = {
    signupSchema,
    loginSchema
}

module.exports = {
    User,
    schemas,
}

