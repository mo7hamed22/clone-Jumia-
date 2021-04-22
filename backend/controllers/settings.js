const express = require("express");
const router = express.Router();
const Settings = require("../models/settings.js");


// ui end user
router.get("/get-sliders", (req, res) => {
  Settings.find({})
    .then((data) => {
      res.status(200).send(...data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});


// dashboard
router.get("/get-settings", (req, res) => {
  Settings.find({})
    .then((data) => {
      res.status(200).send(...data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});



module.exports = router;
