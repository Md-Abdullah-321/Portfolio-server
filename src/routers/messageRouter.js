


//dependencies:
const express = require("express");
const { handlePostMessage, handleGetAllMessages, handleGetMessageById, handleDeleteMessageById, handleSeenMessageById } = require("../controllers/messageController");
const verifyToken = require("../middlewares/verifyToken");
const messageRouter = express.Router();

//POST - post user data:
messageRouter.post("/", handlePostMessage);

//GET - get user data:
messageRouter.get("/",verifyToken, handleGetAllMessages);

//GET - by id
messageRouter.get("/:id", verifyToken , handleGetMessageById);

//DELETE - by id
messageRouter.delete("/:id",verifyToken, handleDeleteMessageById);


//DELETE - by id
messageRouter.get("/seen/:id", verifyToken , handleSeenMessageById);



module.exports = messageRouter;