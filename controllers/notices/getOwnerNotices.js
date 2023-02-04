const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");
const { searchFilter } = require("../../helpers");
const getOwnerNotices = async (req, res) => {
  const { _id: owner } = req.user;

  const { search, page, limit } = req.query;

  const filter = searchFilter({ search, page, limit, owner });

  const result = await Notice.aggregate(filter);
  if (result.length === 0) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getOwnerNotices;
