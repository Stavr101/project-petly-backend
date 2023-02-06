const { HttpError } = require("../helpers");
const path = require("path");
const tempDir = path.join(__dirname, "../", "temp");
const fs = require("fs/promises");

const noticeValidateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      try {
        const files = await fs.readdir(tempDir);
        files.forEach((file) => {
          if (file !== ".gitkeep") {
            const fileDir = path.join(tempDir, file);
            fs.unlink(fileDir);
          }
        });
      } catch (err) {
        next(HttpError(400, err.message));
      }

      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = noticeValidateBody;
