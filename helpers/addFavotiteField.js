const addFavotiteField = ({ noticeList, favorite }) => {
  return noticeList.map((item) => {
    if (favorite.includes(item._id)) {
      return {
        ...item,
        favorite: true,
      };
    }
    return {
      ...item,
      favorite: false,
    };
  });
};

module.exports = addFavotiteField;
