const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("user not authenticated.");
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new Error("Empty token");
    }

    //pass decoded data to the body of the request
    req.body.userID = decodedToken.userID;
    req.body.email = decodedToken.email;
    req.body.name = decodedToken.name
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
