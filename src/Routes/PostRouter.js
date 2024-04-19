const express = require("express");
const route = express.Router();

const postController = require("../Controls/PostController");
const isAuth = require("../Auth/IsAuth"); // Import the IsAuth middleware for authentication

//My post routes
route.post("/quizzes", isAuth, postController.createQuiz);
route.post("/createUser", postController.createQuizUser);
route.post("/userLogin", postController.userLogin);

module.exports = route;
