const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
  const userId = ObjectId();

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = {
    secure_url: gravatar.url(email),
    public_id: null,
  };

  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const newUser = await User.create({
    ...req.body,
    _id: userId,
    token,
    password: hashPassword,
    avatarUrl,
  });

  console.log(newUser)

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      avatarUrl: newUser.avatarUrl,
      address: newUser.address,
      birthday: newUser.birthday,
      _id: newUser._id,
    },

    token,
  });
};
module.exports = register;
