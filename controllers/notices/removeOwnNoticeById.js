const { Notice } = require("../../models/notice");
const { cloudinaryRemoveImage } = require("../../helpers");
const removeOwnNoticeById = async (req, res) => {
  const { noticeId } = req.params;

  const result = await Notice.findByIdAndRemove(noticeId);
  const { public_id } = result.petAvatarURL;
  await cloudinaryRemoveImage(public_id);
  if (!result) {
    throw new NotFound(`Contact with id=${noticeId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${noticeId} deleted`,
  });
};

module.exports = removeOwnNoticeById;
