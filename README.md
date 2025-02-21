# ToDoS! 📋

## Overview 🚀
This is a **To-do Application** where users can **add**, **edit**, **delete**, and **reorder** tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do**, **In Progress**, and **Done**. The app ensures real-time synchronization of tasks and maintains persistence by saving changes instantly to the database.

## Table of Contents 📑
1. [Overview 🚀](#overview-)
2. [Key Features & Requirements 📝](#key-features--requirements-)
3. [App Screenshots 📸](#app-screenshots-)
4. [Technologies Used 💻](#technologies-used-)
5. [Dependencies 📦](#dependencies-)
6. [Live Links 🌐](#live-links-)
7. [Installation Steps 🛠️](#installation-steps-%EF%B8%8F)


## App Screenshots 📸

![App Screenshot 1](https://i.ibb.co.com/HDt66W00/todos-app-home.png)

Feel free to explore the app live using the links provided above. 🎉


### Key Features & Requirements 📝:

#### 1. **Authentication 🔐**:
- Only **authenticated** users can access the app.
- **[Firebase Authentication (Google Sign-In)](https://firebase.google.com/docs/auth)** is used.
- User details (**User ID**, **email**, and **display name**) are stored in the database upon first login.

#### 2. **Task Management System 🛠️**:
- Users can **add**, **edit**, **delete**, and **reorder** tasks.
- Tasks are categorized into:
  - **To-Do**
  - **In Progress**
  - **Done**
- **[Drag-and-drop](https://react-beautiful-dnd.netlify.app/)** functionality is provided for task reordering.
- Real-time updates via **WebSockets** to reflect changes instantly.

#### 3. **Database & Persistence 🗄️**:
- Tasks are stored in **[MongoDB](https://www.mongodb.com/)**.
- **Real-time syncing** is enabled with

#### 4. **Frontend UI 🎨**:
- Built with **[React.js](https://reactjs.org/)** and **[Vite](https://vitejs.dev/)** for a fast, modern UI.
- **[Tailwind CSS](https://tailwindcss.com/)** is used for a clean, responsive design.
- **Drag-and-drop** functionality is implemented using **@dnd-kit/core**.
- Fully **responsive UI** optimized for both desktop and mobile devices.

#### 5. **Backend API 🔌**:
- RESTful **[Express.js](https://expressjs.com/)** API handles task management.
- API Endpoints:
  - `POST /tasks`: Add a new task.
  - `GET /tasks`: Retrieve tasks for the logged-in user.
  - `PUT /tasks/:id`: Update a task.
  - `DELETE /tasks/:id`: Delete a task.

#### 6. **Real-time Synchronization ⚡**:
- Real-time task updates are handled via **WebSocket** or **MongoDB Change Streams**.
- **Optimistic UI** updates ensure a smooth experience, even with network delays.

## Technologies Used 💻
This project uses the following technologies:

### Frontend 🖥️:
- **[React.js](https://reactjs.org/)** (with TypeScript): For building the interactive user interface. ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
- **[Tailwind CSS](https://tailwindcss.com/)**: For styling and creating a responsive, clean, and minimal UI. ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
- **[Firebase](https://firebase.google.com/)**: For handling user authentication (Google Sign-In). ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

- **[Axios](https://axios-http.com/)**: For making API requests to the backend. ![Axios](https://img.shields.io/badge/Axios-5A29E0?logo=axios&logoColor=white)

### Backend 🧑‍💻:
- **[Node.js](https://nodejs.org/)**: JavaScript runtime for the server-side. ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
- **[Express.js](https://expressjs.com/)**: Framework for building the RESTful API to handle CRUD operations for tasks. ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
- **[MongoDB](https://www.mongodb.com/)**: Database for storing tasks with persistence. ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
- **[Socket.io](https://socket.io/)**: For real-time synchronization of tasks between the frontend and backend. ![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket-dot-io&logoColor=white)

## Dependencies 📦
The project has the following dependencies:

```json
"dependencies": {
  "@dnd-kit/core": "^6.3.1",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-label": "^2.1.2",
  "@radix-ui/react-slot": "^1.1.2",
  "axios": "^1.7.9",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "firebase": "^11.3.1",
  "lucide-react": "^0.475.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^6.29.0",
  "react-toastify": "^11.0.3",
  "tailwind-merge": "^3.0.1",
  "tailwindcss-animate": "^1.0.7"
}
```

## Live Links 🌐
- **Frontend URL**: [https://your-frontend-link.com](https://basic-todos-app.surge.sh) 🌍

## Installation Steps 🛠️
To run this project locally, follow the steps below:

### Prerequisites ⚙️
Ensure you have the following installed:
- **[Node.js](https://nodejs.org/)**: [Install Node.js](https://nodejs.org/)
- **[MongoDB](https://www.mongodb.com/)**: [Install MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting.

### 1. Clone the repository
```bash
git clone https://github.com/raiyan27/To-do-webapp
cd To-do-webapp
```
### 2. Install all the dependencies 
```
npm install
```
### 3. Run the app
```
npm run dev
```



