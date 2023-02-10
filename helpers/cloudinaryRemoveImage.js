const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KAY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const cloudinaryRemoveImage = (public_id) => {
  try {
    cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = cloudinaryRemoveImage;
