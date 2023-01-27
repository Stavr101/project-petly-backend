const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  release: Joi.string().required(),
  content: Joi.string().required(),
});

const schemas = {
  addSchema,
};

const News = model("news", newsSchema);

module.exports = {
  News,
  schemas,
};
