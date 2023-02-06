const { Notice } = require("../../models/notice");
const { cloudinaryRemoveImage } = require("../../helpers");
const removeOwnNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findByIdAndRemove(noticeId);
  const { public_id } = result.petAvatarURL;
  if (!result) {
    throw new NotFound(`Contact with id=${noticeId} not found`);
  }
  await cloudinaryRemoveImage(public_id);
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${noticeId} deleted`,
  });
};

module.exports = removeOwnNoticeById;
