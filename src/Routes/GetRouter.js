const express = require("express");
const route = express.Router();

const getController = require("../Controls/GetController");
const isAuth = require("../Auth/IsAuth");

//My get routes
route.get("/quizzes/active", isAuth, getController.getActiveQuiz);
route.get("/quizzes/:id/result", isAuth, getController.getQuizResult);
route.get("/quizzes/all", isAuth, getController.getAllQuiz);

module.exports = route;
