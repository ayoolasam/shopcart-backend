const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/order");

exports.webHook = catchAsyncErrors(async (req, res, next) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    const order = await Order.findOne({ reference: reference });
    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    order.paymentInfo.paymentStatus = "Successfull";

    await order.save();
    res.status(200);
  }
});
