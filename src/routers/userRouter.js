


//dependencies:
const express = require("express");
const { handlePostUserData } = require("../controllers/userControllers");
const userRouter = express.Router();

//POST - post user data:
userRouter.post("/", handlePostUserData)



module.exports = userRouter;