const express = require("express")
const mongoose = require("mongoose")
const bodyParser=require("body-parser")

var server=express()
const authController = require('./controllers/auth')
const userController = require('./controllers/user')

server.use(bodyParser.json())


server.use('/home',authController)
server.use('/user',userController)



server.use('/',(req,resp)=>{
    resp.status(400).send("NOT FOUNDS")
})



mongoose.connect("mongodb+srv://moa:UR-G2jjYfemjEvf@mycluster0.pdrla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})


server.listen(8080,()=>{
  console.log("server is up and running on port 8080");
})
