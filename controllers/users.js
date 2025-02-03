const User = require("../models/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");

//     Register a new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { FirstName, LastName, password, email } = req.body;

  const user = await User.create({
    FirstName,
    LastName,
    password,
    email,
  });

  res.status(201).json({
    message: "User Registered Successfully",
  });
});
//upload userAvatar
exports.uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const { imageUrl } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  user.avatar = imageUrl;
  await user.save();

  res.status(200).json({
    message: `${user.FirstName} Avatar Uploaded Successfully`,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("Invalid Credentials", 404));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid Credentials", 404));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    message: "User Logged in Successfully",
    token,
  });
});

exports.getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    message: `${user.FirstName} Fetched Successfully`,
    data: {
      user,
    },
  });
});
