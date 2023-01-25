const { Notice } = require("../../models/notice");

const addNotice = async (req, res) => {
  const result = await Notice.create({ ...req.body });

  res.status(201).json(result);
};

module.exports = addNotice;
