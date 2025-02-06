const User = require("../models/user");
const Order = require("../models/order");
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
  if (!user) {
    return next(new errorHandler("User not deleted", 400));
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
});

//update OrderStatus
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const { orderStatus, shippingInfo } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler("Order not found", 404));
  }

  order.orderStatus = orderStatus;
  order.shippingInfo = shippingInfo;
  order.shippingInfo.shippedAt = Date.now();

  await order.save();

  res.status(200).json({
    message: "Order Status updated successfully",
    data: order,
  });
});


