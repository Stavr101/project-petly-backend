const { Notice } = require("../../models/notice");
const { searchFilter, addFavotiteField } = require("../../helpers");
const getFavoriteNotices = async (req, res) => {
  const { favorite } = req.user;
  const { search, page, limit } = req.query;
  const filter = searchFilter({ search, page, limit, favorite });
  const result = await Notice.aggregate(filter);

  res.json(addFavotiteField({ noticeList: result, favorite }));
};

module.exports = getFavoriteNotices;
