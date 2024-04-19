# Quiz Application Backend Development Assignment

## Description

This assignment aims to assess your backend development skills using Node.js, Express.js, and MongoDB. You will be building a RESTful API for a quiz application that allows users to create and participate in timed quizzes.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed

### Installation

1. Clone the repository to your local machine using the following command:<br>git clone https://github.com/GeorgeSamuelOdhiambo/quize-assignment.git

2. Navigate to the project directory

3. Create a `.env` file in the root directory of the project and add the following environment variables:<br><li>PORT=8080<br><li>JWT_SECRET="@123333331314455666quiztest5555666677"<br><li>DB_URL="mongodb://localhost:27017/test"<br>


4. Install the project dependencies:<br><li>npm install<br><li>Once you have completed the installation steps, you can run the application using the following command:<br><li>npm run Dev

## Running the Application

Once you have completed the installation steps, you can run the application using the following command:<br>

<b>npm run dev</b>

This command will start the application in development mode, and you can access it at [http://localhost:8080](http://localhost:8080) in your web browser.

## Endpoints and Sample Payloads

1. **POST /quizzes**
   - Payload:
     ```json
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
     ```

2. **POST /createUser**
   - Payload:
     ```json
     {
         "name": "Samuel",
         "email": "test@test.com",
         "password": "@254Kenya"
     }
     ```

3. **POST /userLogin**
   - Payload:
     ```json
     {
         "email": "test@test.com",
         "password": "@254Kenya"
     }
     ```

4. **GET /quizzes/active**

5. **GET /quizzes/:id/result**

6. **GET /quizzes/all**