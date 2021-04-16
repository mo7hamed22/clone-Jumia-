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

////////////// find user by email
router.get("/get-user", authenticateToken, checkIsAdmin, (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(404).send(err);
    }
  });
});

module.exports = router;
