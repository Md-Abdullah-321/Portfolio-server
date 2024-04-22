


//dependencies:
const express = require("express");
const { handlePostProject, handleGetAllProejcts, handleGetSingleProjectById, handleUpdateSingleProjectById, handleDeleteSingleProjectById } = require("../controllers/projectController");
const projectRouter = express.Router();


// POST: Create new project:
projectRouter.post("/", handlePostProject);

// GET: get all projects: 
projectRouter.get("/", handleGetAllProejcts);

// GET: single project by id: 
projectRouter.get("/:id", handleGetSingleProjectById);

// PUT: update single project by id: 
projectRouter.put("/:id", handleUpdateSingleProjectById);


// DELETE: delete single project by id: 
projectRouter.delete("/:id", handleDeleteSingleProjectById);

module.exports = projectRouter;