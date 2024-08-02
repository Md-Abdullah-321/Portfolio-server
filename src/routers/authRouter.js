


//dependencies:
const express = require("express");
const { handleUserLogin, handleChangePassword } = require("../controllers/authController");
const userRouter = express.Router();


//POST - Change user password:
userRouter.put("/", handleChangePassword);

//POST - User Login:
userRouter.post("/", handleUserLogin);



module.exports = userRouter;