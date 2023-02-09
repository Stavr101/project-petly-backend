const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const google = require("./google");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  google,
};
