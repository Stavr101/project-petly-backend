const { Pets } = require("../../models/pets");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Pets.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = addPet;