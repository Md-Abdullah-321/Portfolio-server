const Message = require("../model/messageSchema");
const { successResponse, errorResponse } = require("./responseControllers");


const handlePostMessage = async (req, res, next) => {
    try {
       
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                statusCode: 400,
                message: "Missing required fields"
            });
        }

        await Message.create({ name, email, subject, message });

        return res.status(201).json({
            statusCode: 201,
            message: "Message has been sent successfully"
        });
    } catch (error) {
      
        next(error);
    }
}


const handleGetAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({});
        return successResponse(res, {
            statusCode: 201,
            message: "Messages fetched successfully",
            payload: messages
        })
    } catch (error) {
        next(error)
    }
}

const handleGetMessageById = async (req, res, next) => {
    const id = req.params.id;
    const message = Message.findOneById(id);

    if(!message){
        errorResponse(res, {
            statusCode : 500,
            message: "Message could not found with this id",
        });
    }

    return successResponse(res, {
        statusCode : 200,
        message: "Message fetched by id",
        payload: message 
    })
}

const handleDeleteMessageById = async (req, res, next) => {
    const id = req.params.id;
    await Message.findByIdAndDelete(id);

    return successResponse(res, {
        statusCode: 202,
        message: "Message deleted successfully" 
    })
}


const handleSeenMessageById = async (req, res, next) => {
    const id = req.params.id;
    const message = await Message.findById(id);

    message.seen = true;

    const updatedMessage = await Message.findByIdAndUpdate(id, message, {new : true});
    return successResponse(res, {
        statusCode: 202,
        message: "Message deleted successfully" ,
        payload: updatedMessage,
    })
}


module.exports = {
    handleDeleteMessageById,
    handleGetAllMessages,
    handleGetMessageById,
    handlePostMessage,
    handleSeenMessageById
}