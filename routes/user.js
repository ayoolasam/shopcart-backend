const express = require("express");
const router = express.Router();
const {
  registerUser,
  uploadAvatar,
  loginUser,
  getCurrentUser,
} = require("../controllers/users");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/user/upload/Avatar", uploadAvatar);
router.post("/login", loginUser);
router.get("/user", isAuthenticatedUser, getCurrentUser);

module.exports = router;
