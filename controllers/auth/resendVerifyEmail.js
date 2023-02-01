const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.verify) {
    throw HttpError(400, "User alredy verify");
  }
  const mail = {
    to: email,
    subject: "Please verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Let's verify email</a>`,
  };
  await sendEmail(mail);
  res.json({ message: "Email verify resend" });
};

module.exports = resendVerifyEmail;
