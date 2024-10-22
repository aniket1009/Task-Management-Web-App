# Task Management Web App

## Overview
This is a task management application that allows users to create, update, delete, and view tasks. It features a responsive UI built with React and a backend powered by Node.js and Firebase.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, read, update, and delete tasks.
- User-friendly interface.
- Responsive design.

## Tech Stack
- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, Firebase
- **Database:** Firestore
- **Deployment:** Render (for backend), Netlify (for frontend)

## Setup Instructions

### Prerequisites
- Node.js
- npm
- Firebase account and project

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aniket1009/Task-Management-Web-App.git

### Navigate to the backend directory
1. Add this command
   ```bash
     cd task-manager

### Install dependencies:
1. Run this command in Terminal
   ```bash
     npm install

# API Endpoints
## Tasks
- GET /tasks - Fetch all tasks
- GET /tasks/:id - Fetch a single task by ID
- POST /tasks - Create a new task
- PUT /tasks/:id - Update a task by ID
- DELETE /tasks/:id - Delete a task by ID

## Response:
```
{
  "success": true,
  "data": [
    {
      "id": "task-id",
      "title": "Task Title",
      "description": "Task Description",
      "completed": false,
      "createdAt": "2023-10-21T12:34:56.000Z"
    }
  ]
}

```

## GET /tasks/:id: Retrieve a single task by ID
### •Response:
```
{
  "success": true,
  "data": {
    "id": "task-id",
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "createdAt": "2023-10-21T12:34:56.000Z"
  }
}
```

## POST /tasks: Create a new task
### Request Body:
```
{
  "title": "New Task Title",
  "description": "New Task Description",
  "completed": false
}
```

## PUT /tasks/:id: Update a task by ID
```
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "completed": true
}
```

## DELETE /tasks/:id: Delete a task by ID

# Environment Variables
- ' GOOGLE_APPLICATION_CREDENTIALS ': Path to Firebase service account JSON
- ' ALLOWED_ORIGIN ': Frontend URL for CORS
- ' PORT ': Port on which the backend runs
- ' REACT_APP_API_URL ': API URL for the frontend


