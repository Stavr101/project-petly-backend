const { User } = require("../../models/user");
const { ObjectId } = require("mongodb");

const removeFromFavoriteById = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;
  const favoriteId = new ObjectId(noticeId);
  console.log(favoriteId);

  const result = await User.updateOne(
    { _id },
    { $pull: { favorite: favoriteId } }
  );
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete succes" });
};

module.exports = removeFromFavoriteById;
