const { Pets } = require("../../models/pets");
const { cloudinaryUploadImage } = require("../../helpers");
const { ObjectId } = require("mongodb");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const file = req.file;
  console.log(req.body)
  const petId = ObjectId();
  const { secure_url, public_id } = await cloudinaryUploadImage({
    file,
    petId,
    folderName: "user_pets_img",
  });
    const avatarUrl = {
      secure_url,
      public_id,
    };
  const result = await Pets.create({
    ...req.body,
    _id: petId,
    owner,
    avatarUrl
  });

  res.status(201).json(result);
};

module.exports = addPet;
