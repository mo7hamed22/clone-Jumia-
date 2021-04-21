const express = require("express");
const router = express.Router();
const Settings = require("../models/settings.js");

router.get("/get-sliders", (req, res) => {
  Settings.find({})
    .then((data) => {
      res.status(200).send(...data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});




module.exports = router;
