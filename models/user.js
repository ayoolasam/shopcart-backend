const mongoose = require("mongoose");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please enter a  First name "],
      trim: true,
      unique: true,
    },
    LastName: {
      type: String,
      required: [true, "Please enter a description for this product"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },

    avatar: {
      type: String,
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpired: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrpyt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrpyt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
