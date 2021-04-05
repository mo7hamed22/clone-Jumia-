const mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
  name: String,
  email:{
    type:String, //////regex
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  age:Number
})


module.exports=mongoose.model("User",userSchema)
