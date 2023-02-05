const nameRegexp = /^[a-zA-Z]+$/;
const addressRegexp = /^[a-zA-Z]+(,\s[a-zA-Z]+)*$/;

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
    match: nameRegexp,
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
    match: nameRegexp,
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
});

const Notice = model("notice", noticeShema);
module.exports = {
  Notice,
};
