const express =require ("express")
const router = express.Router()
const Products = require("../models/products.js")


router.post('/add',(req,resp)=>{
    User.deleteOne({email:req.params.email},(err,data)=>{
      if(!err){
        if(data.deletedCount ==0 )  resp.status(200).send("user to delete Not Found!")
        else resp.status(200).send(data)
      }else resp.status(400).send(err)
    })
  })
  

///////////// delete pro user by id
router.delete('/delete/:id',(req,resp)=>{
  User.deleteOne({email:req.params.email},(err,data)=>{
    if(!err){
      if(data.deletedCount ==0 )  resp.status(200).send("user to delete Not Found!")
      else resp.status(200).send(data)
    }else resp.status(400).send(err)
  })
})


/////////// update user by ID



////////////// find user by email




module.exports=router
