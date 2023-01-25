const { Notice } = require("../../models/notice");

const getByCategory = async (req, res) => {
  const { categoryName } = req.params;
  console.log(categoryName);

  const result = await Notice.find({ categoryName });
  res.json(result);
};

module.exports = getByCategory;
