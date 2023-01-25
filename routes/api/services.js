const express = require("express");
const ctrl = require("../../controllers/services");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getAll));

module.exports = router;
