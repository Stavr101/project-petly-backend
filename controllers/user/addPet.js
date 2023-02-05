const { Pets } = require("../../models/pets");
const { uploadPetAvatar } = require("../../helpers");
const { ObjectId } = require("mongodb");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const file = req.file;
  const noticeId = ObjectId();
  const { secure_url: avatarUrl } = await uploadPetAvatar({
    file,
    noticeId,
    folderName: "notices_my-pets_img",
  });
  const result = await Pets.create({
    ...req.body,
    _id: noticeId,
    owner,
    avatarUrl,
  });

  res.status(201).json(result);
};

module.exports = addPet;
