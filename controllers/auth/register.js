const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
  const file = req.file;
  const userId = ObjectId();

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const newUser = await User.create({
    ...req.body,
    _id: userId,
    token,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    token,
  });
};
module.exports = register;
