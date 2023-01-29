const { HttpError } = require("../../helpers");

const { Notice } = require("../../models/notice");
const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  console.log(noticeId);
  const result = await Notice.findById(noticeId).populate(
    "owner",
    "name email"
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getNoticeById;
