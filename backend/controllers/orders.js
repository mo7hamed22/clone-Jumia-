const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");
const User = require("../models/users");





router.post('/set-order',(req,res)=>{

    Orders.create(req.body).then(order=>{
res.send(order)
    }).catch(e=>{
        res.send(e)
    })
    // console.log(req.body)

})





module.exports = router;
