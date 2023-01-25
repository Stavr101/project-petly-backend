const express = require("express");
const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
router.get("/:categoryName", ctrlWrapper(ctrl.getNoticesByCategory));
router.get("/:categoryName/:noticeId", ctrlWrapper(ctrl.getNoticeById));
router.post("/", ctrlWrapper(ctrl.addNotice));
module.exports = router;
