const Order = require("../models/order");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");

//create an Order
exports.order = catchAsyncErrors(async (req, res, next) => {
  const {
    products,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingCost,
    tax,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    user: req.user.id,
    products,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingCost,
    tax,
    totalAmount,
  });

  if (!order) {
    
    return next(new errorHandler("Order Not Created Successfully", 400));
  }

  res.status(200).json({
    message: "order Created successfully",
  });
});

//get All Orders
exports.listOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user");

  res.status(200).json({
    message: "orders Fetched successfully",
    data: {
      orders,
    },
  });
});
