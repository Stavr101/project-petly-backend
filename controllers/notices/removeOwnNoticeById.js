const { Notice } = require("../../models/notice");

const removeOwnNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findByIdAndRemove(noticeId);
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
