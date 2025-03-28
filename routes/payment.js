const express = require("express");
const router = express.Router();
const { webHook } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post("/paystack/webhook", webHook);

module.exports = router;
