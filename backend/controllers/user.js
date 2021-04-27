const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { authenticateToken, checkIsAdmin } = require("../models/jwt");

// check the user is admin or not
router.get("/is-admin", authenticateToken, checkIsAdmin, (req, res) => {
  if (req.cookies != "Not Authorized") {
    User.find(req.cookies).then((data) => {
      res.status(200).send(data);
    });
  } else {
    res.status(404).send(req.cookies);
  }
});

///////////// delete user by userEmail
router.delete("/delete", authenticateToken, checkIsAdmin, (req, resp) => {
  const { email } = req.body;
  User.deleteOne({ email: email }, (err, data) => {
    if (!err) {
      if (data.deletedCount == 0)
        resp.status(200).send("user to delete Not Found!");
      else resp.status(200).send("user Deleted");
    } else resp.status(400).send(err);
  });
});

router.get("/getAll", authenticateToken, checkIsAdmin, (req, resp) => {
  User.find({ isAdmin: { $exists: false } }, (err, data) => {
    if (!err) {
      resp.status(200).send(data);
      console.log("Users", data);
    } else resp.status(400).send(err);
  });
});

/////////// update user by ID
router.put("/update", authenticateToken, checkIsAdmin, (req, res) => {
  const { id, ...user } = req.body;
  User.updateOne({ _id: id }, user)
    .then((data) => {
      const userAfterUpdate =
        data.nModified == 0 ? "user Not Updated" : "User Updated";
      res.status(200).send(userAfterUpdate);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

router.put("/cart", authenticateToken, (req, res) => {
 const {id}=req.token;
 const user=req.body;
  User.updateOne({ _id: id }, user)
    .then((data) => {
      const userAfterUpdate =
        data.nModified == 0 ? "user Not Updated" : "User Updated";
      res.status(200).send(userAfterUpdate);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
router.put("/orders", authenticateToken, (req, res) => {
  const {id}=req.token;
  const user=req.body;
   User.updateOne({ _id: id }, user)
     .then((data) => {
       const userAfterUpdate =
         data.nModified == 0 ? "user Not Updated" : "User Updated";
       res.status(200).send(userAfterUpdate);
     })
     .catch((err) => {
       res.status(401).send(err);
     });
 });
////////////// find user by email
router.post("/get-user", authenticateToken, checkIsAdmin, (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  console.log({ email: email }, "userEmail");
  User.findOne({ email: email }).then((data) => {
    console.log("done");
    res.status(200).send(data);
  });
});
router.post("/is-login", authenticateToken, (req, res) => {
  const { token } = req;
 const {id} = token ;
  User.findOne({ _id: id }).then((data) => {
    console.log("done");
    res.status(200).send(data);
  }).catch(e=>{
    res.status(404).send(e)
  });

 
});
router.get("/get-cart", authenticateToken, (req, res) => {
  const {id}=req.token;
  User.findOne({_id:id},{cart:true,_id:false}).then((data) => {
    res.status(200).send(data);
  });
});

module.exports = router;
