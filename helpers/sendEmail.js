const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: "testpetsgoit@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
//
