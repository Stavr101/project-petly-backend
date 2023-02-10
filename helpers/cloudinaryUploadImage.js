const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs/promises");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KAY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const cloudinaryUploadImage = async ({ file, id, folderName }) => {
  const { path: imagePath } = file;

  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: `petly_project/${folderName}`,
    filename_override: `${id}`,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    fs.unlink(imagePath);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = cloudinaryUploadImage;
