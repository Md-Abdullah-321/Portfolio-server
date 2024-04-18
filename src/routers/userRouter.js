


//dependencies:
const express = require("express");
const { handlePostUserData, handleGetUserData } = require("../controllers/userControllers");
const userRouter = express.Router();

//POST - post user data:
userRouter.post("/", handlePostUserData);

//GET - get user data:
userRouter.get("/", handleGetUserData);



module.exports = userRouter;