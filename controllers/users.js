const User = require("../models/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const Order = require("../models/order");
const { createEmailTemplate } = require("../utils/registrationEmail");
const sendEmail = require("../utils/sendEmail");
const blacklist =
  //     Register a new user
  (exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { FirstName, LastName, password, email } = req.body;

    const user = await User.create({
      FirstName,
      LastName,
      password,
      email,
    });

    if (user) {
      const message = createEmailTemplate({
        userfirstName: user.FirstName,
        userlastName: user.LastName,
      });

      try {
        await sendEmail({
          email: user.email,
          subject: "ShopCart",
          message,
        });
      } catch (e) {
        res.status(500).json({
          message: "Server Error",
          error: e.message,
        });
      }
    }

    res.status(201).json({
      message: "User Registered Successfully",
    });
  }));

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

//login user
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

  const userDetails = await User.findOne({ email });

  const token = user.getJwtToken();

  res.status(200).json({
    message: "User Logged in Successfully",

    data: {
      userDetails,
      token,
    },
  });
});

//get current user
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

//update Current User Details
exports.updateMyDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "User Details Updated Successfully",
    data: user,
  });
});

//fetch Current User Orders
exports.getCurrentUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  if (!orders) {
    return next(new errorHandler("No Orders Found For this User", 404));
  }

  res.status(200).json({
    message: `${req.user.FirstName} Orders Fetched Successfully`,
    data: {
      orders,
      length: orders.length,
    },
  });
});

//log out
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { $inc: { tokenVersion: 1 } });

  res.status(200).json({
    message: `User Logged Out Successfully`,
  });
});
