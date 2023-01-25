const { Service } = require("../../models/services");

const getAll = async (_, res) => {
  const services = await Service.find();

  res.json(services);
};
module.exports = getAll;
