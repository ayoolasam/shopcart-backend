const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/order");
const sendEmail = require("../utils/sendEmail");
const { createEmailTemplate } = require("../utils/orderEmailTemplate");
const User = require("../models/user");

exports.webHook = catchAsyncErrors(async (req, res, next) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const reference = event.data.reference;
    const recemail = event.data.customer.email;

    const order = await Order.findOne({ reference: reference });
    if (!order) {
      return next(new errorHandler("Order not found", 404));
    }

    order.paymentInfo.paymentStatus = "Successfull";
    await order.save();

    const user = await User.findOne({ email: recemail });

    const message = createEmailTemplate({
      orderNumber: order.id,
      userFirst: user.FirstName,
      userSecondName: user.LastName,
      totalAmount:order.totalAmount,
      products:order.products
    });

    try {
      await sendEmail({
        email: recemail,
        subject: "ShopCart",
        message,
      });
    } catch (e) {
      res.status(500).json({
        message: "Server Error",
        error: e.message,
      });
    }

  
    res.status(200).send("Ok")
  }
});
