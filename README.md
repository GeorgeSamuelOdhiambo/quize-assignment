# Quiz Application Backend Development Assignment
<b>Description</b>

This assignment aims to assess your backend development skills using Node.js, Express.js, and MongoDB. You will be building a RESTful API for a quiz application that allows users to create and participate in timed quizzes.

<b>Getting Started</b><br>
To get a copy of the project up and running on your local machine, follow these steps.

<b>Prerequisites</b>
<li>Node.js and npm installed on your machine
<li>MongoDB installed

<b>Installation</b><br>
Clone the repository to your local machine using the following command:<br>
git clone https://github.com/GeorgeSamuelOdhiambo/quize-assignment.git<br>
<b>Navigate to the project directory:</b>
<li>cd your-repository
<li>Create a .env file in the root directory of the project and add the following environment variables:
<li>PORT=8080
<li>JWT_SECRET="@123333331314455666quiztest5555666677"
<li>DB_URL="mongodb://localhost:27017/test"

<b>Install the project dependencies:</b><br>
npm install<br>
Once you have completed the installation steps, you can run the application using the following command:

npm run dev<br>
This command will start the application in development mode and you can access it at http://localhost:8080 in your web browser.

<b>Endpoints and Sample Payloads</b>

<li><b>POST</b> /quizzes
Payload:
{
    "question": "What is the capital of France?",
    "options": [
        "Paris",
        "London",
        "Berlin",
        "Rome"
    ],
    "rightAnswer": 0,
    "startDate": "2024-04-19T04:00:00Z",
    "endDate": "2024-04-19T05:00:00Z"
}
<li><b>POST</b> /createUser
Payload:
{
    "name": "Samuel",
    "email": "test@test.com",
    "password": "@254Kenya"
}
<li><b>POST</b> /userLogin
Payload:
{
    "email": "test@test.com",
    "password": "@254Kenya"
}

<li><b>GET</b> /quizzes/active

<li><b>GET</b> /quizzes/:id/result

<li><b>GET</b> /quizzes/all