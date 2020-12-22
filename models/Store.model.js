const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    StoreName: {
      type: String,
    },
    StoreAddress: {
      type: String,
    },
    Income: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Store", StoreSchema);
