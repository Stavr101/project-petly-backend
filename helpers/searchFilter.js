const searchFilter = ({
  categoryName = null,
  search = null,
  page = 1,
  limit = 8,
  owner = null,
  favorite = null,
}) => {
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
        petAvatarURL: 1,
        price: 1,
        owner: 1,
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

  if (favorite) {
    filter.unshift({
      $match: {
        _id: { $in: favorite },
      },
    });
  }

  if (search) {
    filter.unshift({
      $search: {
        index: "search_in_title",

        autocomplete: {
          query: search,
          path: "title",
          tokenOrder: "sequential",
          fuzzy: {
            maxEdits: 1,
            prefixLength: 1,
            maxExpansions: 256,
          },
        },
      },
    });
  }

  return filter;
};

module.exports = searchFilter;
