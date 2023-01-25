// const { required } = require("joi");
// const Joi = require("joi");
const { Schema, model } = require("mongoose");

const noticeShema = new Schema({
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
  },
  birthdate: {
    type: Date,
  },
  breed: {
    type: String,
    minlength: 2,
    maxlength: 24,
  },
  location: {
    type: String,
  },
  comments: {
    type: String,
    minlength: 8,
    maxlength: 120,
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  categoryName: {
    type: String,
    enum: ["sell", "lost-found", "for-free"],
    default: "sell",
  },
});

const Notice = model("notice", noticeShema);
module.exports = {
  Notice,
};
