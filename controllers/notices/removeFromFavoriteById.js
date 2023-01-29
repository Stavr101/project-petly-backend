const { User } = require("../../models/user");

const removeFromFavoriteById = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const result = await User.updateOne(
    { _id },
    { $pull: { favorite: noticeId } }
  );
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete succes" });
};

module.exports = removeFromFavoriteById;
