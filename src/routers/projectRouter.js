


//dependencies:
const express = require("express");
const { handlePostProject, handleGetAllProejcts, handleGetSingleProjectById, handleUpdateSingleProjectById, handleDeleteSingleProjectById } = require("../controllers/projectController");
const verifyToken = require("../middlewares/verifyToken");
const projectRouter = express.Router();


// POST: Create new project:
projectRouter.post("/", verifyToken ,handlePostProject);

// GET: get all projects: 
projectRouter.get("/", handleGetAllProejcts);

// GET: single project by id: 
projectRouter.get("/:id", handleGetSingleProjectById);

// PUT: update single project by id: 
projectRouter.put("/:id", verifyToken , handleUpdateSingleProjectById);


// DELETE: delete single project by id: 
projectRouter.delete("/:id",verifyToken, handleDeleteSingleProjectById);

module.exports = projectRouter;