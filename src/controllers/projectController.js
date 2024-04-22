const Project = require("../model/projectSchema");
const { errorResponse, successResponse } = require("./responseControllers");


const handlePostProject  = async (req, res, next) => {
    try {
        const {title, overview, features, frontEnd, backEnd, tools, live_url, github_url} = req.body;

        if(!title || !overview || !features || !frontEnd || !backEnd || !tools){
            return res.status(400).json({ message: "Please fill all the input fields" });
        }

        await Project.create({title, overview, features, frontEnd, backEnd, tools, live_url, github_url});
        res.status(200).json({ message: "New Project created successfully." });
    } catch (error) {
        next(error);
    }
}


const handleGetAllProejcts =  async (req, res, next) => {
    try {
        const projects = await Project.find({});

        if(!projects){
            return errorResponse(res, {
                statusCode: 404,
                message: "Could not found any project."
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Projects fetched successfully",
            payload: projects
        })
    } catch (error) {
        next(error);
    }
}



const handleGetSingleProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if(!project){
            return errorResponse(res, {
                statusCode: 404,
                message: "Could not found any project with this id"
            })
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Project fetched successfully.",
            payload: project
        })
    } catch (error) {
        next(error);
    }
}


const handleUpdateSingleProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {title, overview, features, frontEnd, backEnd, tools, live_url, github_url} = req.body;

        const update = {title, overview, features, frontEnd, backEnd, tools, live_url, github_url};
        const updatedProject = await Project.findByIdAndUpdate(id, update, {new : true});

        if(!updatedProject){
            return errorResponse(res, {
                statusCode: 404,
                message: "Could not update project"
            })
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Project updated successfully.",
            payload: updatedProject
        })


    } catch (error) {
        next(error);
    }
}


const handleDeleteSingleProjectById = async (req, res, next) => {
    try {
       const { id } = req.params;
       await Project.findByIdAndDelete(id);

       return successResponse(res, {
        statusCode: 200,
        message: "Project deleted successfully."
       })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    handlePostProject,
    handleGetAllProejcts,
    handleGetSingleProjectById,
    handleUpdateSingleProjectById,
    handleDeleteSingleProjectById
}