const { Notice } = require("../../models/notice");

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;

  console.log(req.user._id);
  // const { birthdate } = req.body;
  // const data = new Date(birthdate);
  // // const data = "2022-11-30T22:00:00.000Z";
  // console.log(data.toLocaleDateString());
  // const nowDate = new Date(Date.now());
  // const years = nowDate.getFullYear() - data.getFullYear();
  // console.log(years);
  const result = await Notice.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = addNotice;
