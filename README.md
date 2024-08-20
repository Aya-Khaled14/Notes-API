 
<!-- TABLE OF CONTENTS --> 
<details> 
  <ol> 
    <li> 
      <a href="#about-the-project">About The Project</a> 
      <ul> 
        <li><a href="#built-with">Built With</a></li> 
      </ul> 
    <li><a href="#roadmap">Roadmap</a></li> 
    <li><a  href="#contact">Contact</a></li> 
    <li><a href="#resources">Resources</a></li> 
  </ol> 
</details> 
 
<!-- ABOUT THE PROJECT --> 
## About The Project 
 
   
# Notes API

The Notes API allows users to perform CRUD operations on notes with user authentication.

## Key Features

- **User Authentication**:
  - User registration and login.

- **Note Management**:
  - Create, read, update, and delete notes.

## Database Schema

### User
- `username`: String, required, unique.
- `email`: String, required, unique.
- `password`: String, required.

### Note
- `title`: String, required.
- `content`: String, required.
- `author`: ObjectId, reference to User, required.

## Endpoints Description

### User Endpoints
- `POST /register`: Register a new user.
  - Request: { username, email, password }
- `POST /login`: Log in an existing user.
  - Request: { email, password }

### Note Endpoints
- `POST /notes`: Create a new note.
  - Request: { title, content } (Authenticated users only)
- `GET /notes`: Get all notes (Authenticated users only)
- `GET /notes/:id`: Get a single note (Authenticated users only)
- `PATCH /notes/:id`: Update a note.
  - Request: { title, content } (Only the author can update)
- `DELETE /notes/:id`: Delete a note.
  - (Only the author can delete)

## Hints

- **Password Hashing**:
  - Hash passwords before saving using bcryptjs.

- **Token-Based Authentication**:
  - Implement JWT for secure user sessions.

- **Validation with express-validator**:
  - Use express-validator for request validation.

- **Mongoose Schema Validation**:
  - Define schema validation in Mongoose models.

---

Feel free to expand this README with installation instructions, usage examples, and any additional details relevant to your project.
</div> 
 
<p align="right">(<a href="#top1">back to top</a>)</p> 
 

 
### Built With 
 
This project's Application files were written in JavaScript,Nodejs,mongoDB,mongoose and Express . 
<p align="right">(<a href="#top1">back to top</a>)</p> 
 


 
<!-- CONTACT --> 
## Contact - Email 
 - Aya Khaled ~ Aya147khaled@gmail.com <br/>  
<p align="right">(<a href="#top1">back to top</a>)</p> 
