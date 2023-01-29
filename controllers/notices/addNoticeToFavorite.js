const { User } = require("../../models/user");
const { ObjectId } = require("mongodb");

const addNoticeToFavorite = async (req, res) => {
  const { noticeId } = req.params;
  const favoriteId = new ObjectId(noticeId);
  console.log(favoriteId);
  const { _id } = req.user;
  await User.updateOne({ _id }, { $addToSet: { favorite: favoriteId } });
  res.json({ message: "add notice to favorite success" });
};

module.exports = addNoticeToFavorite;
