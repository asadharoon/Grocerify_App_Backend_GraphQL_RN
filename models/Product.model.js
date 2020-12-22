const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Capacity: { type: String, required: true },
    StoreID: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
    },
    Image: {
      type: Array,
    },
    cloudID: {
      type: String,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Discount: {
      type: Number,
      required: true,
    },
    Discontinued: {
      type: Boolean,
      default: false,
    },
    Description: {
      type: String,
    },
    DiscountedPrice: {
      type: Number,
      default: 0,
    },
    UpdatedAt: {
      type: Date,
      default: Date.now,
    },
  }
  //  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
