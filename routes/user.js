const express = require("express");
const router = express.Router();
const {
  registerUser,
  uploadAvatar,
  loginUser,
} = require("../controllers/users");

router.post("/register", registerUser);
router.post("/user/upload/Avatar", uploadAvatar);
router.post("/login", loginUser);

module.exports = router;
