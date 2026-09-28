# To-Do List Application

A full-stack To-Do List application built using **React, Node.js, Express.js, and MongoDB**.

Netlify Link:- https://assignment8td.netlify.app/

## Features

* Add, edit, and delete tasks
* Mark tasks as completed/pending
* Search and filter tasks
* REST API integration
* MongoDB database

## Tech Stack

* **Frontend:** React, Vite, JavaScript, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **API:** REST API

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
```

Frontend normally runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## API

```text
GET     /todos
POST    /todos
PUT     /todos/:id
PATCH   /todos/:id/status
DELETE  /todos/:id
```

## Author

**Anuj Khare**
