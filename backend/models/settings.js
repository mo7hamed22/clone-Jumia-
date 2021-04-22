const mongoose = require("mongoose");
var siteSchema = new mongoose.Schema({
  gety: String,
  top_image: Object,
  social_link: Object,
  sliders: Array,
});

module.exports = mongoose.model("Setting", siteSchema);
