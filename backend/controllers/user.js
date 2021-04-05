const express =require ("express")
const router = express.Router()
const User = require("../models/users")


////////////  create new user!!!


///////////// delete user by userEmail
router.delete('/delete/:email',(req,resp)=>{
  User.deleteOne({email:req.params.email},(err,data)=>{
    if(!err){
      if(data.deletedCount ==0 )  resp.status(200).send("user to delete Not Found!")
      else resp.status(200).send(data)
    }else resp.status(400).send(err)
  })
})


router.get('/getAll',(req,resp)=>{
  User.find({},(err,data)=>{
    if(!err){
      
       resp.status(200).send(data)
    }else resp.status(400).send(err)
  })
})


/////////// update user by ID



////////////// find user by email




module.exports=router
