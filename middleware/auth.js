const User = require("../models/user");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(new errorHandler("Login first to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      return next(new errorHandler("Token Expired", 401));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new errorHandler("Unauthorized: Invalid token", 401));
  }
};
