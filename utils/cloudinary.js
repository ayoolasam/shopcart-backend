const express = require("express");
const multer = require("multer");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

dotenv.config({ path: "./config/.env" });

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to temporarily store the uploaded files
// const upload = multer({ dest: "uploads/" });

router.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Define an endpoint to handle image uploads
//expressuploader gets the files from the request and saves it temporaririly  for easy access form uploading
// and then saves the metadata and the file location in the req.files as an object not an array like multer does

router.post("/file", async (req, res) => {
  try {
    // Check if a file is received
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      folder: "ShopCart", // Optional: specify folder in Cloudinary
    });

    // Send back the Cloudinary URL in the response
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.url,
      publicId: result.public_id,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to upload image", e });
    console.log(e);
  }
});

module.exports = router;
