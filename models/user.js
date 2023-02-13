const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const emailRegexp = /^(?=.{10,63}$)([A-Za-z0-9._-]{2,}@[A-Za-z0-9._-]{2,})$/;
const phoneRegexp = /^\+380\d{9}$/;
const nameRegexp = /^([A-Za-zА-Яа-яІіЇїЄєҐґ-\s]{2,16})+$/;
const addressRegexp = /^$|^([A-Za-zА-Яа-яІіЇїЄєҐґ]+),\s([A-Za-zА-Яа-яІіЇїЄєҐґ\s]+)?$/;
const pwdRegexp = /^[\S]{7,32}$/;
const bdayRegexp =
  /^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      minlength: 2,
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
      type: Object,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(pwdRegexp).required(),
  address: Joi.string().pattern(addressRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(pwdRegexp).required(),
});

const userJoiSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(pwdRegexp).required(),
  address: Joi.string().pattern(addressRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  userJoiSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
