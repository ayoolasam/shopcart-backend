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
const { isAuthenticatedUser,  } = require("../middleware/auth");

router.get("/products", listProducts);
router.post("/products",isAuthenticatedUser,  AddProduct);
router.get("/products/:id", fetchProduct);
router.delete("/products/:id",isAuthenticatedUser,  deleteProduct);
router.put("/products/:id",isAuthenticatedUser,  updateProduct);
router.put("/products/image/:id",isAuthenticatedUser,  uploadProductImage);
router.post("/products/review/:id",isAuthenticatedUser, reviewAProduct);

module.exports = router;
