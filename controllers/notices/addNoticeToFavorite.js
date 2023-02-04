const { User } = require("../../models/user");
const { ObjectId } = require("mongodb");

const addNoticeToFavorite = async (req, res) => {
  const { noticeId } = req.params;
  const favoriteId = new ObjectId(noticeId);
  console.log(favoriteId);
  const { _id } = req.user;
  await User.updateOne({ _id }, { $addToSet: { favorite: favoriteId } });
  res.json({ message: "The notice has been added to favorites" });
};

module.exports = addNoticeToFavorite;
