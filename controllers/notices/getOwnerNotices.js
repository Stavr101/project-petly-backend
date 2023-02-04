const { Notice } = require("../../models/notice");
const { searchFilter } = require("../../helpers");
const getOwnerNotices = async (req, res) => {
  const { _id: owner } = req.user;

  const { search, page, limit } = req.query;
  const categoryName = null;

  const filter = searchFilter({ categoryName, search, page, limit, owner });

  const result = await Notice.aggregate(filter);
  res.json(result);
};

module.exports = getOwnerNotices;
