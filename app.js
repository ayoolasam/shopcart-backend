const express = require("express");
const app = express();

const dotenv = require("dotenv");

const error = require("./middleware/error");
const productRoutes = require("./routes/products");
const uploadRoutes = require("./utils/cloudinary");
dotenv.config({ path: "./config/.env" });
const databaseConnection = require("./config/database");

databaseConnection();
app.use(express.json());

app.use("/api/v1", productRoutes);
app.use("/api/v1/upload", uploadRoutes);

const PORT = process.env.PORT;

app.use(error);
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} n ${process.env.NODE_ENV} mode`
  );
});
