(Notes API)
The Notes API allows users to create, read, update, and delete notes. This project focuses on basic CRUD operations and
user authentication.
Key Features
User Authentication:
User registration and login.
Note Management:
Create a new note.
View all notes.
View a single note.
Update a note.
Delete a note.
Database Schema
User:
username : String, required, unique.
email : String, required, unique.
password : String, required.
Note:
title : String, required.
content : String, required.
author : ObjectId, reference to User, required.
Endpoints Description
User Endpoints:
POST /register: Register a new user.
Request: { username, email, password }
POST /login: Log in an existing user.
Request: { email, password }
Note Endpoints:
POST /notes: Create a new note.
Request: { title, content } (Authenticated users only)
GET /notes: Get all notes (Authenticated users only)
GET /notes/:id: Get a single note (Authenticated users only)
PATCH /notes/:id: Update a note.
Request: { title, content } (Only the author can update)
DELETE /notes/:id: Delete a note.
(Only the author can delete)
Hints
Password Hashing:
Always hash passwords before saving them to the database. You can use libraries like bcryptjs for this
purpose.
Token-Based Authentication:
Implement token-based authentication using JWT (JSON Web Tokens). This will help manage user sessions
securely and efficiently.
Validation with express-validator:
Use express-validator to validate incoming requests, such as user registration and note creation.
Example: Add validation checks for required fields, valid email format, and password length.
Mongoose Schema Validation:
Implement schema validation in Mongoose models to ensure data integrity.
Example: Define required fields, data types, and custom validation logic within your Mongoose schemas
