const express = require("express");
const ctrl = require("../../controllers/user");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getUser));

router.post("/", authenticate, ctrlWrapper(ctrl.addPet));

router.get("/pets", authenticate, ctrlWrapper(ctrl.getAll));

router.delete('/:id', authenticate, ctrlWrapper(ctrl.removePet));


module.exports = router;
