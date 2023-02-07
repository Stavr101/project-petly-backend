const cloudinaryUploadImage = require("./cloudinaryUploadImage");
console.log(cloudinaryUploadImage);

const getavatarReq = async ({ file, id, folderName }) => {
  const { secure_url, public_id } = await cloudinaryUploadImage({
    file,
    id,
    folderName,
  });
  return {
    secure_url,
    public_id,
  };
};

module.exports = getavatarReq;
