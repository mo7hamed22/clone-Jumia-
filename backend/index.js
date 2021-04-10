const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

var server = express();
const User = require("./models/users");

const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const categoryController = require("./controllers/category");
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
  res.setHeader("Access-Control-Allow-Methods", "GET,POT,PATCH,DELETE");
  next();
});

server.use("/auth", authController);
server.use("/user", userController);
server.use("/category", categoryController);

// reg email pass
//{
//   "email":"mos@gmail.com",
//   "password": "123456"
// }

// server.post('/products/add', authenticateToken, (req, res) => {
//   res.send('Your prodcut is added');
// })

/// helping function

/// generate -> login

mongoose
  .connect(
    "mongodb+srv://moa:UR-G2jjYfemjEvf@mycluster0.pdrla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("done");
    server.listen(8080, () => {
      console.log("server is up and running on port 8080");
    });
  })
  .catch((e) => {
    console.log(e, "dont");
  });
