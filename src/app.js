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
const authRouter = require("./routers/authRouter");
const messageRouter = require("./routers/messageRouter");
const app = express();
require("dotenv").config();

// CORS Configuration
const corsOptions = {
  origin:  ['https://md-abdullah.vercel.app','http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/education", educationRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/project", projectRouter);
app.use("/api/skill", skillCategoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// Global Error Handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message || "There is an error on the server.",
  });
});

module.exports = app;
