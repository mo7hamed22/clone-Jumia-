const mongoose = require("mongoose");
var siteSchema = new mongoose.Schema({
 sliders: Array
});

module.exports = mongoose.model("Setting", siteSchema);
