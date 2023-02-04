const { HttpError } = require("../../helpers");

const { Notice } = require("../../models/notice");
const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;

  const result = await Notice.findById(noticeId).populate(
    "owner",
    "email phone"
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getNoticeById;
