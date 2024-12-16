const express = require("express");
const router = express.Router();
const admin_controller = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
router.use(express.json());

router
  .route("/createQuestion1")
  .post(authMiddleware, admin_controller.createQuestion1);
router
  .route("/createQuestion2")
  .patch(authMiddleware, admin_controller.createQuestion2);
router
  .route("/createQuestion3")
  .patch(authMiddleware, admin_controller.createQuestion3);

module.exports = router;
