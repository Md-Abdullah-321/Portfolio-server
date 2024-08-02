


//dependencies:
const express = require("express");
const { handleUserLogin, handleChangePassword } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = express.Router();


//POST - Change user password:
userRouter.put("/",verifyToken,handleChangePassword);

//POST - User Login:
userRouter.post("/", handleUserLogin);



module.exports = userRouter;