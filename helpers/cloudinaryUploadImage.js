const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs/promises");

// fs.unlink(path, callback);

cloudinary.config({
  secure: true,
});

const cloudinaryUploadImage = async ({ file, noticeId, folderName }) => {
  const { path: imagePath, originalname } = file;

  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: `petly_project/${folderName}`,
    filename_override: `${noticeId}_${originalname}`,
    resource_type: image,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    fs.unlink(imagePath);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = cloudinaryUploadImage;
