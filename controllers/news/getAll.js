const { News } = require("../../models/news");

const getAll = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  console.log(req.query)
   const skip = (page - 1) * limit;
  const news = await News.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(news);
};
module.exports = getAll;
