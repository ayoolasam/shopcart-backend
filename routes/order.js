const express = require("express");
const router = express.Router();
const { order, listOrders, fetchOrder } = require("../controllers/order");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/order", isAuthenticatedUser, order);
router.get("/orders", isAuthenticatedUser, listOrders);
router.get("/order/:id", isAuthenticatedUser, fetchOrder);

module.exports = router;
