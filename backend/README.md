# FILE: /fullstack-app/fullstack-app/backend/README.md
# Backend for Full-Stack Application

## Overview
This is the backend part of the full-stack application built with Node.js, Express, and MongoDB. It provides RESTful API endpoints for the frontend to interact with.

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd fullstack-app/backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure the database**
   Update the database connection settings in `src/config/db.js` to match your MongoDB setup.

4. **Run the application**
   ```
   npm start
   ```

## API Endpoints

- **GET /students**: Retrieve a list of all students.
- **POST /students**: Add a new student.
- **GET /students/:id**: Retrieve a student by ID.
- **PUT /students/:id**: Update a student by ID.
- **DELETE /students/:id**: Delete a student by ID.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose

## License
This project is licensed under the MIT License.