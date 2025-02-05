const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for this product"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please enter a description for this product"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price for this product"],
    min: [0, "Price must be a positive number"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter the quantity in stock"],
    min: [0, "Quantity cannot be negative"],
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please enter a category for this product"],
  },

  images: [
    {
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
      public_id: {
        type: String,
        required: [true, "Image public ID is required"],
      },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      rating: {
        type: Number,
        required: true,
        min: [0, "Rating must be at least 0"],
        max: [5, "Rating cannot exceed 5"],
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
