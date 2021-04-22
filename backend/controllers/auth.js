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
        resp.status(202).send({message:'Cannot register with this Email is already Register'})
      }else{
        resp.status(404).json({message:'error in creating'})
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
  let existingUser;

  User.findOne({email: req.body.email},(err,data)=>{        
       if(!err){
        if(data !== null){
          existingUser=data
          bcrypt.compare(req.body.password,existingUser.password).then(isValid=>{
            if(isValid){
              const token = generateAccessToken({id:data.id});
              resp.status(200).send({token: token,data:data});
            }else{
              resp.status(404).send('Invalid Password')
            }
          })
         }else{
          resp.send('Invalid Username Or Password');
         }
       }else{
        resp.send('Error in Login');}})
})
module.exports=router
