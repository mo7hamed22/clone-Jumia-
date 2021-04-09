const express =require ("express")
const router = express.Router()
const User = require("../models/users")
const { authenticateToken} = require('../models/jwt')

////////////  create new user!!!
const checkIsAdmin=(req,res,next)=>{
  const {id} = req.token;
  console.log(id)
  User.findOne({_id:id},{_id:false,isAdmin:true}).then((data,err)=>{

if(data){
if(data.toObject().isAdmin){
 next()
}else{
  res.status(501).send('Not Authorized')
}
}else{
  console.log(err)
}
  }).catch(err=>{
    console.log(err.message)
  })
 
}

///////////// delete user by userEmail
router.delete('/delete/:email',authenticateToken,checkIsAdmin,(req,resp)=>{
  User.deleteOne({email:req.params.email},(err,data)=>{
    if(!err){
      if(data.deletedCount ==0 )  resp.status(200).send("user to delete Not Found!")
      else resp.status(200).send('user Deleted')
    }else resp.status(400).send(err)
  })
})


router.get('/getAll',authenticateToken,checkIsAdmin,(req,resp)=>{
  User.find({isAdmin:{$exists:false}},(err,data)=>{
    if(!err){
       resp.status(200).send(data)
    }else resp.status(400).send(err)
  })
})
/////////// update user by ID
router.put('/update',authenticateToken,checkIsAdmin,(req,res)=>{
 const {id,...user}= req.body;
  console.log(req.body,'data')
 

  User.updateOne({_id:id},user).then(data=>{
    const userAfterUpdate = data.nModified==0? "Cannot Update User" :data;
  
    res.status.send(userAfterUpdate)
  }).catch(err=>{
    res.send(err)
  })
})


////////////// find user by email




module.exports=router
