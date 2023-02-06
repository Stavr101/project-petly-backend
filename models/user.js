const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\+[1-9]{1}[0-9]{3,14}$/;
const nameRegexp = /^[a-zA-Z]+$/;
const addressRegexp = /[a-zA-Z]+, [a-zA-Z]+/i;
const pwdRegexp = /^[\S]{7,32}$/;
const bdayRegexp = /^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/


const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      // match: pwdRegexp,
      minlength: 7,
      required: true,
    },
    birthday: {
      type: String,
      match: bdayRegexp,
      default: "01.01.2001",
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    address: {
      type: String,
      match: addressRegexp,
      required: [true, "Address is required"],
    },
    favorite: {
      type: Array,
      default: [],
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: true, //need to change on false for email verification
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).max(32).required(),
  address: Joi.string().pattern(addressRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
const userSchemas = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).max(32).required(),
  address: Joi.string().pattern(addressRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
