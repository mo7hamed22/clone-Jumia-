const express= require("express")
const router = express.Router()

const User = require("../models/users")
const { authenticateToken,generateAccessToken} = require('../models/jwt')

///////// signup endpoint
//////////    "/home/signup"
router.post('/signup',(req,resp)=> {

  console.log("this is signup ENDPOINT!!");
  var user = req.body
  console.log("user: ",user);
  User.create(user,(err,data)=>{
    if(!err){
      console.log(data);
        const token = generateAccessToken({id:data.id})
      resp.status(201).json({token:token})
    }else{
      if(err.keyValue){
        resp.status(400).json({message:'Cannot register with this Email is already Register'})
      }else{
        resp.status(400).json({message:'error in creating'})
      }
    }
  })
})
////////////  login endpoint
///////  "/home/login'"
router.post('/login',(req,resp)=>{ 
  User.findOne({email: req.body.email, password: req.body.password},(err,data)=>{   
    console.log(data);         
       if(!err){
        if(data !== null){
     const token = generateAccessToken({id:data.id});
          resp.status(200).send({token: token});
         }else{
          resp.send('Data is empty');
         }
       }else{
        resp.send('Error in your username');
      }
  })
})

module.exports=router
