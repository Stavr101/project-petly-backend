const express = require("express");
const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
router.get("/:categoryName", ctrlWrapper(ctrl.getNoticesByCategory));
router.get("/:noticeById", ctrlWrapper(ctrl.getCategory));
router.post("/", ctrlWrapper(ctrl.addNotice));
module.exports = router;
