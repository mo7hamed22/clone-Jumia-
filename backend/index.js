const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

var server = express();
const User = require("./models/users");

const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const categoryController = require("./controllers/category");
const productController = require("./controllers/products");
const settings = require("./controllers/settings");
let _port = process.env.PORT || 8080;
server.use(bodyParser.json());
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POT,PATCH,DELETE,PUT");
  next();
});

server.use("/auth", authController);
server.use("/user", userController);
server.use("/category", categoryController);
server.use("/product", productController);
server.use("/settings", settings);
if (process.env.NODE_ENV === "production") {
  server.use(express.static("jumia-front/build"));
}
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://moa:UR-G2jjYfemjEvf@mycluster0.pdrla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("done");
    server.listen(_port, () => {
      console.log("server is up and running on port 8080");
    });
  })
  .catch((e) => {
    console.log(e, "dont");
  });
