const express = require("express");
const router = express.Router();
const {
  registerUser,
  uploadAvatar,
  loginUser,
  getCurrentUser,
  getCurrentUserOrders,
  updateMyDetails,
} = require("../controllers/users");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/user/upload/Avatar", isAuthenticatedUser, uploadAvatar);
router.post("/login", loginUser);
router.get("/user", isAuthenticatedUser, getCurrentUser);
router.put("/user/update", isAuthenticatedUser, updateMyDetails);
router.get("/user/orders", isAuthenticatedUser,getCurrentUserOrders );

module.exports = router;
