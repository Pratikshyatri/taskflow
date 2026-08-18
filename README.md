# TaskFlow

TaskFlow is a full-stack task management web application that allows users to create, view, update, and delete tasks through a simple and responsive interface.

## Features

* Add new tasks
* View all tasks
* Update tasks
* Delete tasks
* Mark tasks as completed
* Persistent data storage using MongoDB
* RESTful API using Express.js
* Responsive frontend interface

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```text
taskflow/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── .gitignore
```

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Pratikshyatri/taskflow.git
cd taskflow
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure MongoDB

Create a `.env` file inside the `backend` folder and add your MongoDB connection string:

```text
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the server

```bash
npm start
```

The application will run locally at:

```text
http://localhost:5000
```

## Future Improvements

* User authentication and authorization
* Task categories and priorities
* Due dates and reminders
* Search and filtering
* Improved mobile responsiveness
* Deployment with a live demo

## Author

**Pratikshya Tripathy**

B.Tech — Information Technology
