const getNoticesByCategory = require("./getNoticesByCategory");
const addNotice = require("./addNotice");
const getNoticeById = require("./getNoticeById");
const getOwnerNotices = require("./getOwnerNotices");
const getFavoriteNotices = require("./getFavoriteNotices");
const addNoticeToFavorite = require("./addNoticeToFavorite");
const removeFromFavoriteById = require("./removeFromFavoriteById");

module.exports = {
  getNoticesByCategory,
  addNotice,
  getNoticeById,
  getOwnerNotices,
  getFavoriteNotices,
  addNoticeToFavorite,
  removeFromFavoriteById,
};
