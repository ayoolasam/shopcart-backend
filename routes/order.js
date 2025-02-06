const express = require("express");
const router = express.Router();
const { order, listOrders } = require("../controllers/order");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/order", isAuthenticatedUser, order);
router.get("/orders", isAuthenticatedUser, listOrders);

module.exports = router;
