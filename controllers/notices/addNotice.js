const { Notice } = require("../../models/notice");
// const { cloudinaryUploadImage } = require("../../helpers");
const { ObjectId } = require("mongodb");
const { getavatarReq } = require("../../helpers");

const addNotice = async (req, res) => {
  const file = req.file;
  const { _id: owner } = req.user;
  const noticeId = ObjectId();

  petAvatarURL = await getavatarReq({
    file,
    id: noticeId,
    folderName: "notices_pets_img",
  });

  const result = await Notice.create({
    ...req.body,
    _id: noticeId,
    owner,
    petAvatarURL,
  });
  if (!result) {
    throw new error();
  }
  res.status(201).json(result);
};

module.exports = addNotice;
