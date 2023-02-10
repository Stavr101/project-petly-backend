const { Pets } = require("../../models/pets");
const { cloudinaryUploadImage } = require("../../helpers");
const { getavatarReq } = require("../../helpers");
const { ObjectId } = require("mongodb");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const file = req.file;
  const petId = ObjectId();
  const avatarUrl = await getavatarReq({
    file,
    id: petId,
    folderName: "user_pets_img",
  });

  const result = await Pets.create({
    ...req.body,
    _id: petId,
    owner,
    avatarUrl,
  });

  res.status(201).json(result);
};

module.exports = addPet;
