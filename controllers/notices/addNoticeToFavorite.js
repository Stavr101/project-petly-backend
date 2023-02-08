const { User } = require("../../models/user");
const { ObjectId } = require("mongodb");
const { HttpError } = require("../../helpers");

const addNoticeToFavorite = async (req, res) => {
  const { noticeId } = req.params;
  const favoriteId = new ObjectId(noticeId);
  const { _id, favorite: oldFavorite } = req.user;
  const result = await User.findByIdAndUpdate(
    { _id },
    { $addToSet: { favorite: favoriteId } },
    {
      new: true,
    }
  );

  const { favorite } = result;
  if (oldFavorite.length === favorite.length) {
    throw HttpError(409, `Notice with id:${noticeId} is already added`);
  }
  res.json({ message: "The notice has been added to favorites" });
};

module.exports = addNoticeToFavorite;
