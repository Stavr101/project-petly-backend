const { Notice } = require("../../models/notice");

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notice.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = addNotice;
