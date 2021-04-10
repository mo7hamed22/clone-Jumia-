const express = require("express");
const router = express.Router();
const Category = require("../models/categories");
const User = require("../models/users");
const { ObjectID } = require("mongodb");

const { authenticateToken ,checkIsAdmin} = require("../models/jwt");
//=====Check IF ID Valid
const validateID = function (req, res, next) {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.send({
      notice: "invalid object id",
    });
  } else {
    next();
  }
};
//=====

//Add  Category
router.post("/addCategory", authenticateToken, checkIsAdmin, (req, res) => {
  let body = req.body;
  let category = new Category(body);
  category
    .save()
    .then((category) => {
      res.send({
        category,
        notice: "successfully created the category",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

//Get All Categories
router.get("/getAllCategories", (req, res) => {
  Category.find()
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Delete Category by ID
router.delete(
  "/deleteCategory",
  authenticateToken,
  checkIsAdmin,
  (req, res) => {
    let id = req.body.id;
    console.log("categoryId", id);
    Category.findByIdAndRemove(id)
      .then((category) => {
        if (category) {
          res.send(`This  Category  ${category} Deleted Sucssfully`);
        } else {
          res.send({
            notice: "category not found",
          });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
);
//Update Category BY ID
router.put(
  "/updateCategory",

  authenticateToken,
  checkIsAdmin,
  (req, res) => {
    //model level method provided by mongoose
    let id = req.body.id;
    let body = req.body;
    console.log("ID", id);

    console.log("Category", body);

    Category.findOneAndUpdate({ _id: id }, { $set: body })
      .then((category) => {
        if (!category) {
          res.send({
            notice: "category not found",
          });
        } else {
          res.send({
            category,
            notice: "Successfully updated the category",
          });
        }
      })
      .catch((err) => {
        console.log("Err", err);
        res.send(err);
      });
  }
);
// =======

module.exports = router;
