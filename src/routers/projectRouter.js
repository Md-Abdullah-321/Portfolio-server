


//dependencies:
const express = require("express");
const { handlePostProject, handleGetAllProejcts } = require("../controllers/projectController");
const projectRouter = express.Router();


// POST: Create new project:
projectRouter.post("/", handlePostProject);

// GET: get all projects: 
projectRouter.post("/", handleGetAllProejcts);

module.exports = projectRouter;