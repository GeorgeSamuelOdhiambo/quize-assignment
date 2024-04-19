const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();
const cron = require("node-cron");

const Quiz = require("../DbModels/quiz");
const User = require("../DbModels/user");

//function to compare the input password and the DB password
const comparePassword = async (currentPassword, dbPassword) => {
  return bcrypt.compare(currentPassword, dbPassword);
};

cron.schedule("*/1 * * * *", async () => {
  // Runs every minute, adjust as needed
  try {
    const currentDate = new Date();
    await Quiz.updateMany(
      { endDate: { $lt: currentDate }, status: "active" },
      { $set: { status: "finished" } }
    );
  } catch (error) {
    console.error("Cron job error:", error);
  }
});

//Implementation for creating a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    //Joi schema for input validation
    const quizSchema = Joi.object({
      question: Joi.string().trim().required(),
      options: Joi.array().items(Joi.string().trim().required()).min(2),
      rightAnswer: Joi.number().required(),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
    });

    // Validate request body against Joi schema
    const { error } = quizSchema.validate({
      question,
      options,
      rightAnswer,
      startDate,
      endDate,
    });
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Convert date strings to ISO format
    const isoStartDate = new Date(startDate).toISOString();
    const isoEndDate = new Date(endDate).toISOString();

    const currentDate = new Date().toISOString();

    // Check if end date is less than the current date
    const isActive = isoEndDate > currentDate;
    const quizData = {
      question,
      options,
      rightAnswer,
      startDate: isoStartDate,
      endDate: isoEndDate,
      status: isActive ? "active" : "inactive", // Set status based on end date
    };

    const quiz = new Quiz(quizData); //save the quiz
    await quiz.save();
    res.status(200).json({ message: "Quiz created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Implementation for creating a user
exports.createQuizUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userSchema = Joi.object({
      email: Joi.string().trim().email().required(),
      name: Joi.string().trim().required(),
      password: Joi.string().trim().required().min(6), // Minimum password length of 6 characters
    });

    // Validate request body against Joi schema
    const { error } = userSchema.validate({ email, name, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Check if user with the same email already exists
    const checkUser = await User.findOne({ email });

    if (checkUser !== null) {
      throw new Error("User with the same email already exists");
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User Created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userSchema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required(),
    });

    // Validate request body against Joi schema
    const { error } = userSchema.validate({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const result = await User.findOne({ email });

    if (result === null) {
      throw new Error("Invalid email");
    }

    const isPasswordValid = await comparePassword(password, result.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        userID: result._id,
        email: result.email,
        name: result.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
