const mongoose = require("mongoose");
var productsSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    required: true,
    unique: true,
  },
  quantity:Number,
  nameAr: String,
  brand: String,
  description: String,
  price: Number,
  discount: Number,
  image: Array,
  product_cat: Object,
});

module.exports = mongoose.model("Product", productsSchema);
