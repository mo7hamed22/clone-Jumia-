const express = require("express")
const mongoose = require("mongoose")
const bodyParser=require("body-parser")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
var server=express()
const User = require("./models/users")

const authController = require('./controllers/auth')
const userController = require('./controllers/user')
server.use(bodyParser.json())


server.use('/home',authController)
server.use('/user',userController)

// reg email pass
//{
//   "email":"mos@gmail.com",
//   "password": "123456"
// }

server.post('/login',(req,resp)=>{ 
  const token = generateAccessToken({ username: req.body.email});
  User.findOne({email: req.body.email, password: req.body.password},(err,data)=>{   
    console.log(data);         
       if(!err){
        if(data !== null){
          resp.status(200).send({data: data, userToken: token});
         }else{
          resp.send('Data is empty');
         }
       }else{
        resp.send('Error in your username');
      }
  })
})



server.post('/products/add', authenticateToken, (req, res) => {
  res.send('Your prodcut is added');
})





/// helping function


/// generate -> login
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


/// authicate token -> generated before
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}



mongoose.connect("mongodb+srv://moa:UR-G2jjYfemjEvf@mycluster0.pdrla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})


server.listen(8080,()=>{
  console.log("server is up and running on port 8080");
})
