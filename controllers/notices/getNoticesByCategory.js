const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");
const { searchFilter, addFavotiteField } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const getNoticesByCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  const { search, page, limit } = req.query;
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const filter = searchFilter({ categoryName, search, page, limit });

  const agrr = await Notice.aggregate(filter);

  if (token && bearer) {
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        next(HttpError(401));
      }
      const result = addFavotiteField({
        noticeList: agrr,
        favorite: user.favorite,
      });
      res.json(result);
      return;
    } catch {
      next(HttpError(401));
    }
  }
  res.json(agrr);
};

module.exports = getNoticesByCategory;
