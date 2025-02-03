const User = require("../models/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");

//     list all users
exports.listUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(201).json({
    message: "Users Fetched Succesfully",
    data: users,
  });
});


