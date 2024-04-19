const Quiz = require("../DbModels/quiz");

//Get active quiz
exports.getActiveQuiz = async (req, res, next) => {
  try {
    const currentDate = new Date().toISOString();

    //find quiz within the current time with status active
    const activeQuiz = await Quiz.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      status: "active",
    });
    if (!activeQuiz) {
      return res.status(200).json({ message: "No active quiz found" });
    }
    res.status(200).json(activeQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get quiz result
exports.getQuizResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      throw new Error("Quiz not found");
    }
    const currentTime = new Date();

    if (currentTime < quiz.endDate) {
      throw new Error(
        "You can't access the quiz result yet. Please wait until the quiz ends."
      );
    }

    const fiveMinutesAfterEnd = new Date(
      quiz.endDate.getTime() + 5 * 60 * 1000
    );

    if (currentTime < fiveMinutesAfterEnd) {
      throw new Error(
        "You can't access the quiz result at the moment. Please try again after later."
      );
    }
    const correctAnswer = quiz.options[quiz.rightAnswer];

    const result = {
      userName: name,
      question: quiz.question,
      correctAnswer: correctAnswer,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all quiz
exports.getAllQuiz = async (req, res, next) => {
  try {
    const allQuiz = await Quiz.find();
    if (!allQuiz) {
      return res.status(200).json({ message: "No quiz's found" });
    }
    res.status(200).json(allQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
