const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs/promises");

// fs.unlink(path, callback);

cloudinary.config({
  secure: true,
});

const cloudinaryRemoveImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = cloudinaryRemoveImage;
