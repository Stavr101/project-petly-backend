const { any } = require("joi");
const { Notice } = require("../../models/notice");

const getByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const filter = [
    { $match: { categoryName } },
    {
      $project: {
        title: 1,
        name: 1,
        categoryName: 1,
        birthdate: 1,
        breed: 1,
        location: 1,
      },
    },
    { $skip: skip },
    { $limit: Number(limit) },
  ];
  if (search) {
    filter.unshift({
      $search: {
        index: "search_in_title",
        autocomplete: {
          query: search,
          path: "title",
        },
      },
    });
  }

  const agrr = await Notice.aggregate(filter);

  res.json(agrr);
};

module.exports = getByCategory;
