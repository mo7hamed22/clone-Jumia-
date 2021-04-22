const express = require("express");
const router = express.Router();
const Products = require("../models/products.js");
const { authenticateToken, checkIsAdmin } = require("../models/jwt");

router.post("/add", authenticateToken, checkIsAdmin, (req, resp) => {
  const product = req.body;
  Products.create(product, (err, data) => {
    if (!err) {
      resp.status(200).send(data);
    } else {
      resp.status(404).send(err);
    }
  });
});

///////////// delete pro  by id
router.delete("/delete", authenticateToken, checkIsAdmin, (req, resp) => {
  const { id } = req.body;
  Products.deleteOne({ _id: id }, (err, data) => {
    if (!err) {
      if (data.deletedCount == 0)
        resp.status(200).send("product delete Not Found!");
      else resp.status(200).send("product Deleted");
    } else resp.status(400).send(err);
  });
});

/////////// update user by ID

// something went wrong with put method -> later check
router.post("/update", authenticateToken, checkIsAdmin, (req, res) => {
  const { id, ...product } = req.body.product;
  console.log(product, "product", id, "id");
  Products.updateOne({ _id: id }, product)
    .then((data) => {
      const productAfterUpdate =
        data.nModified == 0 ? "Cannot Update product" : data;

      res.status(200).send(productAfterUpdate);
    })
    .catch((err) => {
      res.send(err);
    });
});

////////////// find product by name
router.post("/get-product", (req, res) => {
  const productName = req.body.nameEn;
  Products.findOne({ nameEn: productName })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("cannot find this product");
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});
// get All Products
router.get("/get-all", (req, res) => {
  Products.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// get by catName for home view sliders
router.get("/getbycat/", async (req, res) => {
  let resArr = [];
  let cat_name = req.params.cat_name;
  await Products.find({ "product_cat.main": "supermarket" }).then((data) => {
    resArr.push(data);
  });
  await Products.find({ "product_cat.main": "Fashion" }).then((data) => {
    resArr.push(data);
  });

  await Products.find({ "product_cat.main": "Phones & Tablets" }).then(
    (data) => {
      resArr.push(data);
    }
  );

  await Products.find({ "product_cat.main": "Home & Office" }).then((data) => {
    resArr.push(data);
  });

  await Products.find({ "product_cat.main": "Electronics" }).then((data) => {
    resArr.push(data);
    res.status(200).send(resArr);
  });
});

router.get("/get-Product-type/:type", (req, resp) => {
  const type = req.params.type;
  Products.find({ "product_cat.type": type })
    .then((product) => {
      resp.status(200).send(product);
    })
    .catch((err) => {
      resp.status(404).send(err);
    });
});

module.exports = router;
