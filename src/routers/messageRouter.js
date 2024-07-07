


//dependencies:
const express = require("express");
const messageRouter = express.Router();

//POST - post user data:
messageRouter.post("/", handlePostMessage);

//GET - get user data:
messageRouter.get("/", handleGetAllMessages);

//GET - by id
messageRouter.get("/:id", handleGetMessageById);

//DELETE - by id
messageRouter.delete("/:id", handleDeleteMessageById);



module.exports = messageRouter;