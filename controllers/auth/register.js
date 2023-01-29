const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { BASE_URL } = process.env;

const { HttpError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Please verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Let's verify email</a>`,
  };
  await sendEmail(mail);
  
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};
module.exports = register;
