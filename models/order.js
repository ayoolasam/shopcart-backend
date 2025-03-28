const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        numOfProducts: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },

      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: [true, "please select a a payment method"],
      enum: {
        values: ["COD", "CARD"],
        message: "please select :COD or CARD",
      },
    },
    reference: {
      type: String,
    },

    paymentInfo: {
    
      paymentStatus: { type: String, default: "Pending" }, // 'Pending', 'Completed', 'Failed'
      paidAt: { type: Date },
    },

    orderStatus: {
      type: String,
      default: "Processing", // 'Processing', 'Shipped', 'Delivered', 'Cancelled'
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    },

    shippingInfo: {
      courier: { type: String }, // e.g., 'DHL', 'FedEx'

      shippedAt: { type: Date },
    },
    deliveryMethod: {
      type: String,
      required: [true, "please select a delivery method"],
      enum: {
        values: ["Delivery", "PickUp"],
        message: "please select :Pick Up or Delivery",
      },
    },

    deliveredAt: { type: Date },

    subtotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
