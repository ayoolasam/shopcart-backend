const express = require("express");
const router = express.Router();
const {
  listProducts,
  AddProduct,
  fetchProduct,
  deleteProduct,
  updateProduct,
  uploadProductImage,
  reviewAProduct,
} = require("../controllers/products");

router.get("/products", listProducts);
router.post("/products", AddProduct);
router.get("/products/:id", fetchProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.put("/products/image/:id", uploadProductImage);
router.post("/products/review/:id", reviewAProduct);

module.exports = router;
