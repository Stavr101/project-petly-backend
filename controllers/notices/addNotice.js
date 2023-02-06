const { Notice } = require("../../models/notice");
const { cloudinaryUploadImage } = require("../../helpers");
const { ObjectId } = require("mongodb");

const addNotice = async (req, res) => {
  const file = req.file;
  const { _id: owner } = req.user;
  const noticeId = ObjectId();
  const getavatar = async () => {
    const { secure_url, public_id } = await cloudinaryUploadImage({
      file,
      noticeId,
      folderName: "notices_pets_img",
    });
    return {
      secure_url,
      public_id,
    };
  };

  const result = await Notice.create({
    ...req.body,
    _id: noticeId,
    owner,
    petAvatarURL: await getavatar(),
  });
  if (!result) {
    throw new error();
  }
  res.status(201).json(result);
};

module.exports = addNotice;
