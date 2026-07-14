# TaskMatrix

Enterprise Agile Project Management Platform

---

## Capstone Project

This repository contains the planning, architecture, UI/UX design, and implementation for **TaskMatrix**, a production-grade Agile Project Management platform inspired by Jira, Trello, and Asana.

TaskMatrix enables software teams to efficiently manage projects, organize tasks using Kanban boards, collaborate in real time, and monitor project progress from a centralized dashboard.

This repository follows a **Modular Monolith Architecture** with separate frontend and backend applications organized inside a single monorepo.

---

# Designated Track

**Full Stack Developer**

---

# Tech Stack

## Frontend

- React 18
- TypeScript
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Axios
- Socket.io Client

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Socket.io
- Multer
- Cloudinary

---

## DevOps

- Git
- GitHub
- Render
- Vercel

---

# Folder Structure

```
prodesk-capstone-taskmatrix/

├── frontend/
│
├── backend/
│
├── docs/
│     ├── figma/
│     └── architecture/
│
├── README.md
├── Prompts.md
└── .gitignore
```

---
## Figma Design

Public Design File:

https://www.figma.com/design/nyFHGR0PcI0m5JQcg7Wso0/TaskMatrix-Capstone?node-id=0-1&t=xUYBJvgORmsKPqfY-1

---

# Planned Features

## Authentication

- User Registration
- Login
- JWT Authentication
- Refresh Tokens
- Protected Routes
- Role Based Authorization

---

## Dashboard

- Workspace Overview
- Recent Projects
- Recent Tasks
- Activity Feed
- Statistics Cards

---

## Project Management

- Create Project
- Edit Project
- Delete Project
- Archive Project
- Search Projects
- Filter Projects

---

## Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Members
- Due Dates
- Priority
- Status
- Labels
- Attachments

---

## Kanban Board

- Drag & Drop Tasks
- To Do
- In Progress
- Review
- Done

---

## Team Collaboration

- Invite Members
- Member Roles
- Online Status

---

## Notifications

- Task Assigned
- Due Date Reminder
- Project Updates

---

## Real-time Features

- Live Chat
- Live Notifications
- Online Users
- Real-time Task Updates

---

## Profile

- Update Profile
- Change Password
- Upload Avatar

---

## Settings

- Workspace Settings
- Notification Preferences
- Security Settings

---

# UI Screens

- Login
- Register
- Dashboard
- Projects
- Kanban Board
- Task Details
- Notifications
- Team Members
- Profile
- Calendar
- Settings

---

# Database Collections

Planned MongoDB Collections

- Users
- Projects
- Tasks
- Comments
- Notifications

---

# System Architecture

The following Entity Relationship Diagram (ERD) represents the planned MongoDB database schema for TaskMatrix.

It illustrates the relationships between Users, Projects, Tasks, Comments, Project Members, and Notifications.

![ERD](docs/architecture/erd.png)
---

# UI Wireframes

Figma designs are available inside

```
docs/figma
```

---

# Planned Folder Structure

## Frontend

```
src/

api/
assets/
components/

features/
    auth/
    dashboard/
    projects/
    tasks/
    users/
    notifications/

hooks/
layouts/
lib/
pages/
routes/
services/
store/
types/
utils/
App.tsx
```

---

## Backend

```
src/

config/
controllers/
middleware/
models/
routes/
services/
sockets/
utils/
validators/
server.js
```

---

# Future Improvements

- Redis Caching
- Docker
- CI/CD
- AI Task Suggestions
- Calendar Integration
- Email Notifications
- Analytics Dashboard
- Activity Logs
- Dark Mode

---

# Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

---

# Author

**Sriniketh Vangipuram**