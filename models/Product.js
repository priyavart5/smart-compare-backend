const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  specifications: { type: Object, required: true },
  listings: [
    {
      platform: { type: String, required: true },
      price: { type: Number, required: true }, 
      availability: { type: String, enum: ["In Stock", "Out of Stock"], required: true },
      rating: { type: Number, min: 0, max: 5, required: true }, 
      reviewCount: { type: Number, default: 0},
      link: { type: String, required: true },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
