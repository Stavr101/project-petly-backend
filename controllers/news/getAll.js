const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  // const filter = typeof favorite === "boolean" ? { favorite } : {};
  const query = { owner };
  // if (typeof favorite !== "undefined") {
  //   query.favorite = favorite;
  // }
  // eslint-disable-next-line no-unneeded-ternary
  query.favorite = favorite ? favorite : { $in: [true, false] };

  const result = await Contact.find(query, "-createdAt, - updatedAt", {
    skip,
    limit,
  }).populate("owner", "name, email");
  // console.log(result);
  // ({}, "-createdAt, - updatedAt");

  res.json(result);
};
module.exports = getAll;
