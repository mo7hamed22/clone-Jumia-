const mongoose = require("mongoose");
var reviewSchema = new mongoose.Schema({
  productID: String,
  userName: String,
  rating: Number,
  reviewText: String,
  createdAt: Date,
});

module.exports = mongoose.model("Review", reviewSchema);
