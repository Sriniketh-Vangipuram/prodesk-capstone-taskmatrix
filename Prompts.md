# AI Prompt Log

This file documents the AI-assisted prompts used during the planning, architecture, development, debugging, and deployment of the TaskMatrix Capstone Project.

AI assistance was used as a development support tool for architecture exploration, code review, debugging, implementation guidance, and documentation.

---

# Phase 1 — Product Planning and Architecture

## Prompt 1 — Product Vision

Design a production-grade enterprise Agile Project Management application similar to Jira, Asana, and Trello.

The application should support projects, tasks, Kanban workflows, teams, authentication, notifications, collaboration, and future scalability.

---

## Prompt 2 — Technical Architecture

Suggest a scalable folder structure following Staff Engineer best practices using React, TypeScript, Express, Node.js, MongoDB, and Mongoose.

The architecture should support feature-based frontend organization and modular backend development.

---

## Prompt 3 — Product Requirement Document

Generate a Product Requirement Document for a commercial-grade Agile Project Management platform.

Define:

* User personas
* Core workflows
* MVP features
* Future features
* Functional requirements
* Non-functional requirements
* Security requirements
* Scalability considerations

---

## Prompt 4 — UI/UX Design

Help design modern Figma wireframes for:

* Login
* Registration
* Dashboard
* Kanban Board
* Projects
* Task Details
* Profile
* Calendar
* Settings
* Notifications
* Team Members

The design should be clean, modern, enterprise-oriented, and suitable for an Agile project management platform.

---

## Prompt 5 — Database Architecture

Design an Entity Relationship Diagram and MongoDB data model for:

* Users
* Projects
* Tasks
* Comments
* Project Members
* Notifications

Explain how the collections should relate to each other.

---

## Prompt 6 — MVP Prioritization

Suggest production-ready feature prioritization for an MVP and future releases.

Separate features into:

* P0 — Mandatory
* P1 — Important
* P2 — Advanced
* Future Enhancements

---

## Prompt 7 — Technology Selection

Recommend technologies, UI libraries, authentication strategies, deployment platforms, and development workflows suitable for a production-grade full-stack Agile project management platform.

---

## Prompt 8 — Architecture Decision

Explain the architectural differences between:

* Modular Monolith
* Microservices

Recommend the most appropriate architecture for the current project and explain the trade-offs.

---

## Prompt 9 — Repository and Git Workflow

Provide guidance for:

* Repository organization
* Documentation
* Git branching
* Commit strategy
* Environment variables
* Deployment workflow

---

# Phase 2 — Authentication Implementation

## Prompt 10 — Authentication Architecture

Design a secure authentication flow using:

* React
* Express
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Zod

The flow should support registration, login, password hashing, token generation, and protected routes.

---

## Prompt 11 — Registration and Login Validation

Design Zod validation schemas for user registration and login.

Registration should validate:

* Name
* Email
* Password
* Confirm Password

Login should validate:

* Email
* Password

---

## Prompt 12 — Protected Routes

Implement JWT authentication middleware for Express.

The middleware should:

1. Read the Authorization header.
2. Extract the Bearer token.
3. Verify the JWT.
4. Attach the authenticated user ID to the request.
5. Reject unauthenticated requests.

---

## Prompt 13 — Frontend Authentication

Implement frontend authentication using:

* React
* React Router
* Redux Toolkit
* Axios

The frontend should:

* Store the JWT token.
* Protect authenticated routes.
* Redirect unauthenticated users to login.
* Support logout.

---

# Phase 3 — Sprint 15: Secure CRUD Implementation

## Prompt 14 — Task Data Model

Design a Mongoose Task model containing:

* Title
* Description
* Status
* Priority
* Due Date
* Owner ID
* Created At
* Updated At

The model should support Kanban-style task workflow management.

---

## Prompt 15 — Task Validation

Create Zod schemas for task creation and task updates.

The validation should support:

* Title length validation
* Description length validation
* Task status validation
* Priority validation
* Optional due date

---

## Prompt 16 — REST CRUD API

Implement JWT-protected REST API endpoints for tasks:

```text
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

The endpoints should use controllers and services.

---

## Prompt 17 — Data Ownership

Implement task ownership validation.

Each task should store the authenticated user's ID as its owner.

Users should only be able to:

* Read their own tasks.
* Update their own tasks.
* Delete their own tasks.

The authenticated user ID should be extracted from the JWT.

---

## Prompt 18 — Ownership-Scoped Queries

Implement database queries that restrict task operations using both:

```text
taskId
```

and:

```text
authenticatedUserId
```

For example:

```ts
Task.findOne({
  _id: taskId,
  ownerId: authenticatedUserId,
});
```

---

# Phase 4 — Frontend CRUD Integration

## Prompt 19 — API Integration

Connect the React frontend to the task REST API using Axios.

Implement API functions for:

* Fetching tasks
* Creating tasks
* Updating tasks
* Deleting tasks

---

## Prompt 20 — TanStack Query Integration

Implement TanStack Query hooks for task management.

The hooks should support:

* useTasks
* useCreateTask
* useUpdateTask
* useDeleteTask

Use query invalidation where appropriate to synchronize server state.

---

## Prompt 21 — Task Creation Modal

Create a reusable task creation modal using:

* React
* TypeScript
* React Hook Form
* Zod
* TanStack Query

The form should support:

* Title
* Description
* Status
* Priority
* Due Date

---

## Prompt 22 — Task Editing

Create a task editing modal that allows users to update existing task information.

Ensure that the edited task is persisted through the backend API.

---

## Prompt 23 — Kanban Board

Create a Kanban board that groups tasks into:

```text
To Do
In Progress
Completed
```

Tasks should be dynamically grouped based on their status.

---

## Prompt 24 — Task Statistics

Create dashboard statistics showing:

* Total Tasks
* Pending Tasks
* In Progress Tasks
* Completed Tasks

The values should be calculated from the fetched task data.

---

# Phase 5 — Optimistic UI

## Prompt 25 — Optimistic Task Deletion

Implement optimistic deletion for tasks.

When a user deletes a task:

1. Remove it from the UI immediately.
2. Send the DELETE request to the backend.
3. Restore or invalidate the data if the request fails.
4. Avoid a full-page reload.

The implementation should provide a responsive user experience.

---

# Phase 6 — Debugging and Error Resolution

## Prompt 26 — CORS Debugging

Debug a production CORS error where the deployed frontend origin was rejected because the backend was still configured to allow only:

```text
http://localhost:5173
```

Configure the backend to allow both local development and the deployed Vercel frontend.

---

## Prompt 27 — Vercel SPA Routing

Debug a Vercel deployment where refreshing a React Router route resulted in a 404 error.

Configure the deployment so that client-side routes correctly resolve to the React application.

---

## Prompt 28 — TypeScript Route Parameters

Resolve TypeScript errors where Express route parameters were inferred as:

```ts
string | string[]
```

but service functions required:

```ts
string
```

Ensure route parameters are safely converted before being passed to service functions.

---

## Prompt 29 — React Hook Form and React Compiler

Review React Hook Form usage involving:

```ts
watch("password")
```

and explain the React Compiler compatibility warning.

Replace unsafe usage where appropriate with a more suitable subscription-based approach such as `useWatch`.

---

## Prompt 30 — React Effect State Warning

Review a React component that initializes form state using `useEffect` and multiple `setState` calls.

Explain the cascading render warning and suggest a safer component design that avoids unnecessary synchronization effects.

---

## Prompt 31 — Kanban Callback Debugging

Debug a runtime error:

```text
Uncaught TypeError: onEdit is not a function
```

Trace the callback through:

```text
DashboardPage
    ↓
KanbanBoard
    ↓
KanbanColumn
    ↓
TaskCard
```

Ensure that callbacks are correctly passed through the component tree.

---

# Phase 7 — Deployment

## Prompt 32 — Production Deployment

Deploy the frontend and backend separately.

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

Verify:

* Production API URLs
* CORS configuration
* Environment variables
* Database connectivity
* Authentication flow

---

## Prompt 33 — Production Environment Variables

Configure environment variables for local and production environments.

Ensure that:

* Secrets are not committed to Git.
* JWT secrets remain backend-only.
* MongoDB credentials remain private.
* Frontend API URLs point to the correct backend deployment.

---

# Phase 8 — Sprint 15 Validation

## Prompt 34 — Feature Complete Validation

Review the Sprint 15 requirements and verify that the application supports:

* JWT-protected CRUD endpoints.
* Task ownership validation.
* Frontend API integration.
* Task creation.
* Task retrieval.
* Task updates.
* Task deletion.
* Kanban workflow.
* Dashboard statistics.
* Optimistic deletion.

Identify any incomplete P0 or P1 functionality.

---

## Prompt 35 — QA Demo Preparation

Create a short QA demonstration flow covering:

1. Login.
2. Open the protected dashboard.
3. Create a task.
4. Display the task on the Kanban board.
5. Edit the task.
6. Move the task through its workflow status.
7. Delete the task.
8. Demonstrate that the UI updates without a page reload.

---

# AI Usage Statement

AI tools were used as development assistants throughout the project.

The AI was used for:

* Architecture brainstorming
* Feature planning
* Code structure suggestions
* Debugging assistance
* Error analysis
* API design guidance
* Documentation
* Deployment troubleshooting
* Code review and improvement suggestions

The final implementation was integrated, tested, debugged, and deployed as part of the TaskMatrix Capstone Project.

The developer remains responsible for understanding, adapting, testing, and validating the generated suggestions before integrating them into the project.
