const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$/;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    brandImage: {
      type: String,
      required: true,
    },
    schedule: {
      type: {
        mn: String,
        tu: String,
        we: String,
        th: String,
        fr: String,
        sa: String,
        su: String,
      },
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
      match: phoneRegexp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

serviceSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  release: Joi.string().required(),
  content: Joi.string().required(),
});

const schemas = {
  addSchema,
};

const Service = model("service", newsSchema);

module.exports = {
  Service,
  schemas,
};
