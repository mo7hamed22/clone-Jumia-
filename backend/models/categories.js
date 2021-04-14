const mongoose = require("mongoose");
var categorySchema = new mongoose.Schema({
    icon:String,
  nameEn: {
    type: String,
    required: true,
    unique: true,
  },
  nameAr: String,

  subCategory: [
    {
      subCatName: String,
      subCatArray: Array,
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
