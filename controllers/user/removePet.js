const { Pets } = require("../../models/pets");
const { HttpError } = require("../../helpers");
const { cloudinaryRemoveImage } = require("../../helpers");

const removePet = async (req, res) => {
  const { id } = req.params;

  const result = await Pets.findByIdAndRemove(id);
  const { public_id } = result.avatarUrl;
  await cloudinaryRemoveImage(public_id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    message: "Pet deleted",
  });
};

module.exports = removePet;
