const express= require("express")
const router = express.Router()

const User = require("../models/users")


///////// signup endpoint
//////////    "/home/signup"
router.post('/signup',(req,resp)=> {
  console.log("this is signup ENDPOINT!!");
  var user = req.body
  console.log("user: ",user);
  User.create(user,(err,data)=>{
    if(!err){
      console.log(data);
      resp.status(201).send(data)
    }else{
      resp.status(400).send(err)
    }
  })
})

////////////  login endpoint
///////  "/home/login'"
router.get('/login/:userEmail/:userPassword',(req,resp)=> {
  var email= req.params.userEmail
  var password=req.params.userPassword
  User.findOne({email:email,password:password},(err,data)=>{
    if(!err){
      if(data != null){
        console.log("data : ",data);
        resp.status(202).send(data)
      }else resp.status(202).send(" user not registered!!")
    }else resp.status(404).send(err)
  })
})


module.exports=router
