const searchFilter = (
  categoryName = null,
  search = null,
  page = 1,
  limit = 8,
  owner = null
) => {
  const skip = (page - 1) * limit;
  const filter = [
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

  if (categoryName) {
    filter.unshift({ $match: { categoryName } });
  }

  if (owner) {
    filter.unshift({ $match: { owner } });
  }
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

  return filter;
};

module.exports = searchFilter;
