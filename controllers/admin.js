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

//fetch a user
exports.fetchUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    message: "User fetched successfully",
    data: user,
  });
});

//delete a user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "User deleted successfully",
  });
});
