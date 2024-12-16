const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/MyQuestions-controller");
const authMiddleware = require("../middlewares/auth-middleware");
router.use(express.json());

router.get("/findMyQuestions", authMiddleware, auth_controller.findMyQuestions);
router.get(
  "/findSubmissions/:id",
  authMiddleware,
  auth_controller.findSubmissions
);
router.get(
  "/findAnswerSheet/:id",
  authMiddleware,
  auth_controller.findAnswerSheet
);
module.exports = router;
