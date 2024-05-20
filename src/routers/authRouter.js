


//dependencies:
const express = require("express");
const { handleUserLogin } = require("../controllers/authController");
const userRouter = express.Router();

//POST - User Login:
userRouter.post("/", handleUserLogin);



module.exports = userRouter;