const express = require("express");
const ctrl = require("../../controllers/user");

const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getUser));

router.post(
  "/",
  authenticate,
  upload.single("avatarUrl"),
  ctrlWrapper(ctrl.addPet)
);

router.get("/pets", authenticate, ctrlWrapper(ctrl.getAll));

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removePet));

router.put("/:userId", authenticate, ctrlWrapper(ctrl.updateById));
router.patch("/", authenticate, ctrlWrapper(ctrl.updateByParams));
router.patch(
  "/avatar",
  authenticate,
  upload.single("userAvatar"),
  ctrlWrapper(ctrl.updateUserAvatar)
);

module.exports = router;
