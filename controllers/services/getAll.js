const { Service } = require("../../models/service");

const getAll = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  console.log(req.query);
  const skip = (page - 1) * limit;
  const services = await Service.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(services);
};
module.exports = getAll;
