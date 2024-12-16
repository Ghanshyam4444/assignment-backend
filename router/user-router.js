const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
router.use(express.json());
router.get("/getAllQuestions", authMiddleware, auth_controller.getallQuestions);
router.get(
  "/findQuestionDetails/:id",
  authMiddleware,
  auth_controller.findQuestionDetails
);
router.post(
  "/submitResponses1",
  authMiddleware,
  auth_controller.submitResponses1
);

router.patch(
  "/submitResponses2",
  authMiddleware,
  auth_controller.submitResponses2
);

router.patch(
  "/submitResponses3",
  authMiddleware,
  auth_controller.submitResponses3
);

module.exports = router;
