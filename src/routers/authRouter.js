


//dependencies:
const express = require("express");
const { handleUserLogin, handleChangePassword, handleLogoutUser } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userRouter = express.Router();



//POST - User Login:
userRouter.post("/signin", handleUserLogin);

//POST - Change user password:
userRouter.put("/",verifyToken, isLoggedIn , handleChangePassword);

//POST - Logout user:
userRouter.post("/signout",verifyToken, isLoggedIn , handleLogoutUser);



module.exports = userRouter;