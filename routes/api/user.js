const express = require("express");
const ctrl = require("../../controllers/user");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getUser));

router.post("/", authenticate, ctrlWrapper(ctrl.addPet));

router.get("/pets", authenticate, ctrlWrapper(ctrl.getAll));

router.delete('/:id', authenticate, ctrlWrapper(ctrl.removePet));

// router.get("/own", authenticate, ctrlWrapper(ctrl.getOwnerNotices));
// router.delete(
//   "/own/:noticeId",
//   authenticate,
//   ctrlWrapper(ctrl.removeOwnNoticeById)
// );

// router.get("/favorite", authenticate, ctrlWrapper(ctrl.getFavoriteNotices));
// router.patch(
//   "/favorite/:noticeId",
//   authenticate,
//   ctrlWrapper(ctrl.addNoticeToFavorite)
// );
// router.delete(
//   "/favorite/:noticeId",
//   authenticate,
//   ctrlWrapper(ctrl.removeFromFavoriteById)
// );

// router.post("/", authenticate, ctrlWrapper(ctrl.addNotice));
module.exports = router;
