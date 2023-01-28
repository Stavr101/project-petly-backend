const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]$/;
const nameRegexp = /^[a-zA-Z]+$/;
const addressRegexp = /^[a-zA-Z]+(,\s[a-zA-Z]+)*$/;
const pwdRegexp = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{7,32}$/;

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
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      match: pwdRegexp,
      minlength: 7,
      required: true,
    },
    birthday: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    favorite: {
      type: Array,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
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
  password: Joi.string().min(7).max(32).pattern(pwdRegexp).required(),
  address: Joi.string().pattern(addressRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).pattern(pwdRegexp).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

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
