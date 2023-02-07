const { User } = require("../../models/user.js");
const { getavatarReq } = require("../../helpers");

const updateUserAvatar = async (req, res) => {
  const file = req.file;
  const { _id } = req.user;
  console.log("user id", _id);

  newAvatarUrl = await getavatarReq({
    file,
    id: _id,
    folderName: "user_avatars_img",
  });

  const result = await User.updateOne(
    { _id },
    {
      $set: { avatarUrl: newAvatarUrl },
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: `User avatar is updated successfully` });
};

module.exports = updateUserAvatar;
