const express = require("express");
const router = express.Router();
const { listUsers } = require("../controllers/admin");
const { isAuthenticatedUser } = require("../middleware/auth");

router.get("/users", isAuthenticatedUser, listUsers);

module.exports = router;
