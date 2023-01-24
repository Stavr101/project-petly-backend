const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const passport = require("./passport");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  passport,
};
