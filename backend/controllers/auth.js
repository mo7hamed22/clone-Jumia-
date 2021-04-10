const express= require("express")
const router = express.Router()
const User = require("../models/users")
const {generateAccessToken} = require('../models/jwt')
const bcrypt=require('bcryptjs')
//////////    "/home/signup"
router.post('/signup',(req,resp)=> {
  // var user = req.body
  // console.log("user: ",user);
  var {password,...user}=req.body
 bcrypt.hash(password,12).then(password=>{
   password =password;
  const newUser = {...user,password}
  User.create(newUser,(err,data)=>{
    if(!err){
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
  console.log(newUser)
 }).catch(err=>{
   console.log(err)
 })
 
  
})

///////  /home/login
router.post('/login',(req,resp)=>{ 
  User.findOne({email: req.body.email, password: req.body.password},(err,data)=>{   
    console.log(data);         
       if(!err){
        if(data !== null){
     const token = generateAccessToken({id:data.id});
          resp.status(200).send({token: token});
         }else{
          resp.send('Invalid Username Or Password');
         }
       }else{
        resp.send('Error in your username');}})
})
module.exports=router
