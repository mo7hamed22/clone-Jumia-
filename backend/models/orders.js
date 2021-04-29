const mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  paymentId:{
    type:String,
    unique:true
  },
  orderDate:Date,
  payerId:String,
  userId:String,
  orderToken:String,
  orderFunds:Number
});

module.exports = mongoose.model("Order", orderSchema);
