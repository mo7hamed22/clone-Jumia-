const express = require("express");
const router = express.Router();
const Settings = require("../models/settings.js");
const { authenticateToken, checkIsAdmin } = require("../models/jwt");

//add sliders
router.post("/add-Sliders", authenticateToken, checkIsAdmin, (req, res) => {
  let body = req.body;
  let sliders = new Settings(body);
  sliders
    .save()
    .then((sliders) => {
      res.send({
        sliders,
        notice: "successfully created the Settings",
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

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
