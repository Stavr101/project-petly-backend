const { Pets } = require("../../models/pets");
const { HttpError } = require("../../helpers");

const removePet = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const result = await Pets.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, "Not found");
    };

    res.json({
        status: "success",
        message: "Pet deleted",
    });
};

module.exports = removePet;