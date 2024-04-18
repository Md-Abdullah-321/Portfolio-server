const express = require("express");
const userRouter = require("./routers/userRouter");
const educationRouter = require("./routers/educationRouter");
const experienceRouter = require("./routers/experienceRouter");
const projectRouter = require("./routers/projectRouter");
const skillCategoryRouter = require("./routers/skillCategoryRouter");
const { errorResponse } = require("./controllers/responseControllers");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();



//App level Middleware:
//1. BodyParser - Use to parse body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//2. Add Cors: 
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
//3. use cookie parser:
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({"message": "Hello World!"})
})

//Routers:
app.use("/api/user", userRouter);
app.use("/api/education", educationRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/project", projectRouter);
app.use("/api/skill", skillCategoryRouter);


//Global error handling:
app.use((err,req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status || 500,
        message: err.message || "There is an error on the server."
    })
})



module.exports = app;