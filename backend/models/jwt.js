const jwt= require('jsonwebtoken')
const User= require('../models/users')

function generateAccessToken(id) {
    return jwt.sign(id, 'this_is_my_secret_algol', { expiresIn: '6h' });
  }
  
  
  /// authenticate token -> generated before
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, 'this_is_my_secret_algol', (err, token) => {
      if (err) return res.status(404).json({message:'User Not Found'})
      req.token = token
      next()
    })
  }
  const checkIsAdmin=(req,res,next)=>{
    const {id} = req.token;
    console.log(id)
    User.findOne({_id:id},{_id:false,isAdmin:true}).then((data,err)=>{
  
  if(data){
  if(data.toObject().isAdmin){
  req.cookies=data
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
  module.exports={
      authenticateToken,
      generateAccessToken,
      checkIsAdmin

  }