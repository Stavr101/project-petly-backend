const { News } = require("../../models/news");

const getAll = async (_, res) => {
  const news = await News.find();

  res.json(news);
};
module.exports = getAll;
