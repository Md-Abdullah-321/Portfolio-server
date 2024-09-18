


//dependencies:
const express = require("express");
const { handlePostUserData, handleGetUserData, handleUpdateUserData } = require("../controllers/userControllers");
const verifyToken = require("../middlewares/verifyToken");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userRouter = express.Router();

//POST - post user data:
userRouter.post("/", handlePostUserData);

//GET - get user data:
userRouter.get("/", handleGetUserData);

//PUT - update user data:
userRouter.put("/", verifyToken, isLoggedIn, handleUpdateUserData);



module.exports = userRouter;