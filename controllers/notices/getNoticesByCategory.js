const { Notice } = require("../../models/notice");
const { searchFilter } = require("../../helpers");

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { search, page, limit } = req.query;
  const filter = searchFilter(categoryName, search, page, limit);

  const agrr = await Notice.aggregate(filter);
  res.json(agrr);
};

module.exports = getNoticesByCategory;
