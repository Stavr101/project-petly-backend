const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { searchFilter, addFavotiteField } = require("../../helpers");

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { search, page, limit } = req.query;
  const { authorization } = req.headers;

  const filter = searchFilter({ categoryName, search, page, limit });

  const agrr = await Notice.aggregate(filter);

  if (authorization) {
    const [bearer, token] = authorization.split(" ");
    const { favorite } = await User.findOne({ token });
    const result = addFavotiteField({ noticeList: agrr, favorite });
    res.json(result);
  }
  res.json(agrr);
};

module.exports = getNoticesByCategory;
