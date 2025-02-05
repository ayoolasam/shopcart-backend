const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const Product = require("../models/product");

//getProducts

exports.listProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().populate("reviews.user");

  res.status(200).json({
    message: "Products Fetched Successfully",
    length: products.length,
    data: {
      products,
    },
  });
});

//AddProduct
exports.AddProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, rating, quantity, category, images } =
    req.body;

  const product = await Product.create({
    name,
    description,
    price,
    rating,
    quantity,
    category,
    images,
  });

  res.status(201).json({
    message: "Product Created Successfully",

    data: {
      product,
    },
  });
});

//fetchProduct

exports.fetchProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    message: "Product Fetched Successfully",
    data: {
      product,
    },
  });
});

//deleteProduct
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Product Deleted Successfully",
  });
});

//updateProduct

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, rating, quantity, category, images } =
    req.body;

  let product = await Product.findById(req.params.id);

  if (!product) {
    new errorHandler("Product not found", 404);
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      rating,
      quantity,
      category,
      images,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    message: "Product Updated Successfully",
  });
});

//upload an image for a product

exports.uploadProductImage = catchAsyncErrors(async (req, res, next) => {
  const { imageUrl, publicId } = req.body;

  const product = await Product.findById(req.params.id);

  const image = {
    imageUrl,
    publicId,
  };

  if (!product) {
    new errorHandler("Product not Found", 404);
  }

  product.images.push({
    url: imageUrl,
    public_id: publicId,
  });

  await product.save();

  res.status(201).json({
    message: "Product image uploaded Successfully",
  });
});

//review a Product
exports.reviewAProduct = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    new errorHandler("Product not Found", 404);
  }

  product.reviews.push({
    rating: rating,
    comment: comment,
    user: req.user._id,
  });

  product.numReviews = product.numReviews + 1;

  //goes through every review in the reviews array and adds the sum starting from 0 plus the review.rating
  const totalRating = product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  product.rating = totalRating / product.numReviews;

  await product.save();

  res.status(201).json({
    message: "Product review sent Successfully",
  });
});
