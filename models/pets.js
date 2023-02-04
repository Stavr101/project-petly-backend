const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const nameRegexp = /^[a-zA-Z]+$/;
const dateRegexp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

const petSchema = new Schema(
    {
        name: {
            type: String,
            match: nameRegexp,
            required: true,
        },
        date: {
            type: String,
            match: dateRegexp,
            required: true,
        },
        breed: {
            type: String,
            match: nameRegexp,
            required: true,
        },
        avatarUrl: {
            type: String,
            default: false,
        },
        comment: {
            type: String,
            min: 2,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

petSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().required(),
  breed: Joi.string().required(),
  avatarUrl: Joi.string(),
  comment: Joi.string().required(),
});

const schemas = {
  addSchema,
};

const Pets = model("pets", petSchema);

module.exports = {
  Pets,
  schemas,
};
