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
    deliveryMethod,
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
    deliveryMethod,
    
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

  if (!orders) {
    return next(new errorHandler("Orders Not Found Successfully", 400));
  }

  res.status(200).json({
    message: "orders Fetched successfully",
    data: {
      orders,
    },
  });
});

//get All Orders
exports.fetchOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return next(new errorHandler("Order Not Found Successfully", 400));
  }
  res.status(200).json({
    message: "order Fetched successfully",
    data: {
      order,
    },
  });
});
