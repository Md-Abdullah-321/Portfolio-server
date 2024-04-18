


//dependencies:
const express = require("express");
const { handlePostUserData, handleGetUserData, handleUpdateUserData } = require("../controllers/userControllers");
const userRouter = express.Router();

//POST - post user data:
userRouter.post("/", handlePostUserData);

//GET - get user data:
userRouter.get("/", handleGetUserData);

//PUT - update user data:
userRouter.put("/", handleUpdateUserData);



module.exports = userRouter;