const { Service } = require("../../models/service");

const getAll = async (_, res) => {
  const services = await Service.find();

  res.json(services);
};
module.exports = getAll;
