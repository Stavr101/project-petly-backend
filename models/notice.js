const nameRegexp = /^[a-zA-Z]+$/;
const addressRegexp = /^[a-zA-Z]+(,\s[a-zA-Z]+)*$/;
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const { Schema, model } = require("mongoose");

const noticeShema = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 48,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },
    sex: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    birthdate: {
      type: Date,
      required: true,
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 24,
      required: true,
    },
    location: {
      match: addressRegexp,
      type: String,
      required: true,
    },
    petAvatarURL: {
      type: Object,
      required: true,
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
      required: true,
    },
    categoryName: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      default: "sell",
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      required: function () {
        return this.categoryName === "sell";
      },
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

noticeShema.post("save", handleMongooseError);

const addNoticeSchema = Joi.object({
  title: Joi.string().required().min(2).max(48),
  name: Joi.string().required().min(2).max(16),
  sex: Joi.string().required().valid("male", "female"),
  birthdate: Joi.date().required(),
  breed: Joi.string().required().min(2).max(24),
  location: Joi.string().required().pattern(addressRegexp),
  comments: Joi.string().required().min(8).max(120),
  categoryName: Joi.string().required().valid("sell", "lost-found", "for-free"),
  price: Joi.string()
    .when("categoryName", {
      is: "sell",
      then: Joi.required(),
    })
    .min(1),
});

const schemas = {
  addNoticeSchema,
};

const Notice = model("notice", noticeShema);
module.exports = {
  Notice,
  schemas,
};
