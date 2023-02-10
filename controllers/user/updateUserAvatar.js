const { User } = require("../../models/user.js");
const { getavatarReq } = require("../../helpers");

const updateUserAvatar = async (req, res) => {
  const file = req.file;
  const { _id } = req.user;

  newAvatarUrl = await getavatarReq({
    file,
    id: _id,
    folderName: "user_avatars_img",
  });

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarUrl: newAvatarUrl },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    avatarUrl: newAvatarUrl,
    message: `User avatar is updated successfully`,
  });
};

module.exports = updateUserAvatar;
