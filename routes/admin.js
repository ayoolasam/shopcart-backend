const express = require("express");
const router = express.Router();
const {
  listUsers,
  fetchUser,
  deleteUser,
  updateOrderStatus,
} = require("../controllers/admin");
const { isAuthenticatedUser } = require("../middleware/auth");

router.get("/users", isAuthenticatedUser, listUsers);
router.get("/user/:id", isAuthenticatedUser, fetchUser);
router.delete("/user/:id", isAuthenticatedUser, deleteUser);
router.put("/order/update/:id", isAuthenticatedUser, updateOrderStatus);

module.exports = router;
