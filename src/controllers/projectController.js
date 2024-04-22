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

module.exports = {
    handlePostProject,
}