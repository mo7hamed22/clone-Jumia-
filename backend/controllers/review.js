const express = require("express");
const router = express.Router();
const Review = require("../models/review.js");
const { authenticateToken, checkIsAdmin } = require("../models/jwt");

router.post("/add", authenticateToken, (req, resp) => {
  const review = req.body;
  Review.create(review, (err, data) => {
    if (!err) {
      resp.status(200).send(data);
    } else {
      resp.status(404).send(err);
    }
  });
});

router.get("/get-all", (req, res) => {
  Review.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.get("/product-review/:proID", (req, res) => {
  const proID = req.params.proID;
  Review.find({ productID: proID })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
