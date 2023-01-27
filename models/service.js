const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    addressUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    workDays: {
      type: [
        { isOpen: Boolean, from: String, to: String },
        { isOpen: Boolean, from: String, to: String },
        { isOpen: Boolean, from: String, to: String },
        { isOpen: Boolean, from: String, to: String },
        { isOpen: Boolean, from: String, to: String },
        { isOpen: Boolean, from: String, to: String },
        { isOpen: Boolean, from: String, to: String },
      ],
      required: true,
    },
    address: {
      type: String,
      min: 2,
      max: 30,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

serviceSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  addressUrl: Joi.string().required(),
  imageUrl: Joi.string().required(),
  workDays: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemas = {
  addSchema,
};

const Service = model("service", serviceSchema);

module.exports = {
  Service,
  schemas,
};
