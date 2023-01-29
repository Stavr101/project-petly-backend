const express = require("express");
const ctrl = require("../../controllers/notices");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
router.get("/category/:categoryName", ctrlWrapper(ctrl.getNoticesByCategory));
router.get(
  "/category/:categoryName/:noticeId",
  ctrlWrapper(ctrl.getNoticeById)
);
router.get("/own", authenticate, ctrlWrapper(ctrl.getOwnerNotices));
router.delete(
  "/own/:noticeId",
  authenticate,
  ctrlWrapper(ctrl.removeOwnNoticeById)
);

router.get("/favorite", authenticate, ctrlWrapper(ctrl.getFavoriteNotices));
router.patch(
  "/favorite/:noticeId",
  authenticate,
  ctrlWrapper(ctrl.addNoticeToFavorite)
);
router.delete(
  "/favorite/:noticeId",
  authenticate,
  ctrlWrapper(ctrl.removeFromFavoriteById)
);

router.post("/", authenticate, ctrlWrapper(ctrl.addNotice));
module.exports = router;
