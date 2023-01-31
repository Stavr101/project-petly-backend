const { Pets } = require("../../models/pets");

const getAll = async (req, res) => {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Pets.find({ owner }, "-createdAt -updatedAt", { skip, limit })
                .populate("owner", "name date breed comment");
        res.json(result)
};
module.exports = getAll;