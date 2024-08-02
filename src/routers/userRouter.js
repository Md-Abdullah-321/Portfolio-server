


//dependencies:
const express = require("express");
const { handlePostUserData, handleGetUserData, handleUpdateUserData } = require("../controllers/userControllers");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = express.Router();

//POST - post user data:
userRouter.post("/",verifyToken, handlePostUserData);

//GET - get user data:
userRouter.get("/", handleGetUserData);

//PUT - update user data:
userRouter.put("/", verifyToken, handleUpdateUserData);



module.exports = userRouter;