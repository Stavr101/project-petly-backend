const { Notice } = require("../../models/notice");

const getByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find({ categoryName });
  res.json(result);
};

module.exports = getByCategory;
