const { HttpError } = require("../../helpers");
const { cloudinaryUploadImage } = require("../../helpers");
const { User } = require("../../models/user");

const updateById = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  if (file) {
    const { secure_url, public_id } = await cloudinaryUploadImage({
      file,
      userId,
      folderName: "user_avatar_img",
    });
    const avatarUrl = {
      secure_url,
      public_id,
    };
    const result = await User.findByIdAndUpdate(
      userId,
      { ...req.body, avatarUrl },
      {
        new: true,
      }
    );
  } else {
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
  }

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateById;
