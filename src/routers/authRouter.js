


//dependencies:
const express = require("express");
const { handleUserLogin, handleChangePassword } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = express.Router();



//POST - User Login:
userRouter.post("/", handleUserLogin);

//POST - Change user password:
userRouter.put("/",verifyToken,handleChangePassword);



module.exports = userRouter;