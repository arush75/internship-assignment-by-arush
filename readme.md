Note:
1.	Please go to the db.js file in the config directory and set the MongoDB server URL correctly to ensure the API works.
2.	Check the port of the API before running it.
3.	Run npm i to install all packages.
4.	Set the MongoDB URL for database connection in ./config/db.js.
5.	Use npm start to start the server.
6.	Utilize Postman or any other API testing tool to verify all API configurations provided in the documentation.
// all commenting in the projects are done by ai to make it easy for understanding.


# Task Management System Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Logical Design of the Database](#logical-design-of-the-database)
3. [Table and Entity Relation Design](#table-and-entity-relation-design)
4. [Creating Schema](#creating-schema)
5. [Writing APIs for Front-end Integration](#writing-apis-for-front-end-integration)
6. [API Documentation](#api-documentation)
7. [Conclusion](#conclusion)

## 1. Project Overview

This project is a task management system that allows users to create and manage projects and tasks. Users can register, create projects, and assign tasks to those projects, providing a straightforward interface for managing their work.

## 2. Logical Design of the Database

### Entities
1. **User**: Represents individuals who can register, create projects, and manage tasks.
2. **Project**: Represents a collection of tasks associated with a specific user.
3. **Task**: Represents an individual task that belongs to a project.

### Relationships
- A User can have multiple Projects (One-to-Many).
- A Project can have multiple Tasks (One-to-Many).

## 3. Table and Entity Relation Design

### User Table
- Fields:
  - username (unique)
  - email (unique)
  - password

### Project Table
- Fields:
  - user_id (Foreign Key to User)
  - name (unique)
  - description

### Task Table
- Fields:
  - project_name (Foreign Key to Project)
  - username (Foreign Key to User)
  - title
  - description
  - status
  - name (unique)

## 4. Creating Schema

To create the schema for our database, we'll use MongoDB. Here's an example of how to define the schemas using Mongoose:

```javascript


// User Schema
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;


// Project Schema
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    username: { type: String, required: true }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;


// Task Schema
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    project_name: { type: String, required: true },
    username: { type: String, required: true },
    task_name: { type: String, required: true }, 
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Pending' }, 
});

const Task = mongoose.model('Task', taskSchema);
export default Task;


## 5. Writing APIs for Front-end Integration

To integrate with the front-end, we'll create RESTful APIs using Express.js. Here's an overview of the main API endpoints:

1. User Registration
2. Create Project
3. Get User Projects
4. Delete Project
5. Create Task
6. Delete Task
7. Get Tasks by User and Project

These APIs will handle CRUD operations for users, projects, and tasks, ensuring data integrity and proper relationships between entities.

## 6. API Documentation

### User Registration
- **Method**: POST
- **URL**: `/api/users/register`
- **Body**: 
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### Create Project
- **Method**: POST
- **URL**: `/api/projects`
- **Body**:
  ```json
  {
    "username": "testuser",
    "name": "Test Project",
    "description": "This is a test project"
  }
  ```

### Get User Projects
- **Method**: GET
- **URL**: `/api/projects`
- **Body**:
  ```json
  {
    "username": "testuser"
  }
  ```

### Delete Project
- **Method**: DELETE
- **URL**: `/api/projects`
- **Body**:
  ```json
  {
    "username": "testuser",
    "projectName": "Test Project"
  }
  ```

### Create Task
- **Method**: POST
- **URL**: `/api/tasks`
- **Body**:
  ```json
  {
    "project_name": "Test Project",
    "username": "testuser",
    "title": "Test Task",
    "description": "This is a test task",
    "task_name": "Test Task"
  }
  ```

### Delete Task
- **Method**: DELETE
- **URL**: `/api/tasks`
- **Body**:
  ```json
  {
    "project_name": "Test Project",
    "username": "testuser",
    "task_name": "Test Task"
  }
  ```

### Get Tasks by User and Project
- **Method**: get
- **URL**: `/api/tasks`
- **Body**:
  ```json
  {
    "username": "testuser",
    "project_name": "Test Project"
  }
  ```

## 7. Conclusion

This task management system offers a comprehensive API for managing users, projects, and tasks. Key features include:

- User Management: Ensures unique usernames and emails.
- Project Management: Allows creation and management of projects.
- Task Management: Enables adding, updating, and deleting tasks.

The system provides a clear and efficient solution for project management needs, with a well-structured database design and intuitive API endpoints for seamless front-end integration.

**Note**: Before running the API, ensure that you properly configure the MongoDB server URL in the `db.js` file located in the config directory. Also, verify the API port to ensure proper functionality.