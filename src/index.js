const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//import my routes
const getRouter = require("./Routes/GetRouter");
const postRouter = require("./Routes/PostRouter");

const app = express();
//prevent cors error by allowing traffic from everywhere
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

app.use(getRouter, postRouter);

//connect to mongo db
mongoose.connect(process.env.DB_URL).then((result) => {
  const server = app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });

  server.on("error", (error) => {
    console.error("Server error:", error);
  });
});
