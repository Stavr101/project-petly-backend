const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { HttpError } = require("../../helpers");
const { ObjectId } = require("mongodb");
const register = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
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

  // const mail = {
  //   to: email,
  //   subject: "Please verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Let's verify email</a>`,
  // };
  // await sendEmail(mail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    token,
  });
};
module.exports = register;
