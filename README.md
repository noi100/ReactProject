
# 🚀 Smart Project Management Platform (Task & Kanban Board)

A modern, highly-polished Full-Stack project management web application designed to streamline workflows, organize projects, and manage tasks using interactive Kanban boards. 

This platform features a sleek Dark Theme layout with seamless client-side state management, responsive transitions, and real-time backend synchronization.

---

## ✨ Key Features

- **User Authentication (Login):** Form-based user login with built-in client validation, powered by custom design inputs.
- **Project Dashboard (All Projects):** A centralized dynamic dashboard displaying all current projects, showing status, metrics, and summary information.
- **Interactive Kanban Board:** Deep-dive view for individual projects with custom columns representing the task life cycle: `To Do`, `In Progress`, `Testing`, and `Done`.
- **Advanced Task Management:** Easily add, edit, and delete tasks within a project. Tasks support comprehensive attributes including Title, Description, Due Date, and Priority levels (High, Medium, Low).
- **Robust Global State Management:** Built using Redux Toolkit combined with Redux Persist to seamlessly store active session data locally and coordinate asynchronous API interactions via AsyncThunks.
- **Premium UI/UX Experience:** Dark-themed UI with fluid animations, glowing accents, and sleek elements built utilizing Material-UI (MUI), PrimeReact, and custom CSS.

---

## 🛠 Tech Stack

### Frontend
- **React (Vite architecture)**
- **Redux Toolkit & Redux Persist** (Global state management & local storage sync)
- **React Router DOM** (Dynamic client-side routing)
- **Material-UI (MUI) & PrimeReact** (Modern component architectures and component styling)

### Backend (API Link)
- **Node.js & Express**
- **Default Endpoint Base Url:** `http://localhost:4000/api/projects`

---

## 📁 Core File Architecture (Frontend)

```text
src/
├── components/
│   ├── Home.jsx           # Landing / Welcome view
│   ├── Login.jsx          # Secure client authentication screen
│   ├── AllPage.jsx        # Core projects dashboard view
│   ├── AddProject.jsx     # Dialog modal / Form to create or modify projects
│   ├── ProjectItem.jsx    # Kanban board container for an individual project
│   └── TaskItem.jsx       # Modal layout for introducing or editing specific tasks
├── Store/
│   ├── store.js           # Combined Redux reducer with localStorage persistence configuration
│   ├── projectSlice.js    # Asynchronous thunks & logic for projects and tasks
│   └── userSlice.js       # Authentication state and active user context tracking
├── App.jsx                # Router endpoints mapping and top-level Providers
└── main.jsx
