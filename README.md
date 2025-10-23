# Task Manager App

A simple and clean full‑stack Task Manager you built with React + Vite + Tailwind (frontend) and Node.js + Express + MongoDB (backend). It lets users register/login and manage tasks (create, view, update, delete) with categories.



## What I built (at a glance)

- Full‑stack app with separate folders:
  - `BACKEND/` → Express API with MongoDB (Mongoose)
  - `FRONTED/` → React + Vite UI (Tailwind via `@tailwindcss/vite`)
- Authentication: register and login. The backend returns a token which is actually the MongoDB user `_id`.
- Authorization: the frontend sends that token in a request header named `user` to access protected routes.
- Tasks: create, read, update, and delete tasks with a category. UI provides search and modals for view/edit.

## How the app works (workflow)

1) Register/Login
- Frontend pages: `Register.jsx` and `LoginPage.jsx` send form data to the API.
- Backend routes:
  - `POST /api/v1/register` → creates user and returns `{ token: <userId> }`.
  - `POST /api/v1/login` → verifies credentials and returns `{ token: <userId> }`.
- Frontend stores this `token` in `localStorage` as `token`.

2) Loading the session
- On app load, `MainContext.jsx` reads `localStorage.token`.
- If present, it calls `GET /api/v1/profile` with header `user: <token>` to get the current user (without password).
- It also calls `GET /api/v1/all-task` with the same header to fetch all tasks for that user and stores them in context state.

3) Managing tasks
- Add: `AddTaskPage.jsx` submits `POST /api/v1/add-task` with `{ title, description, category }` and header `user: <token>`. On success, it refreshes the task list.
- View/Edit: `TaskViewModel.jsx` opens a modal. It prefers using tasks already in context; for Edit it sends `PUT /api/v1/task/:id`.
- Delete: `TaskView.jsx` sends `DELETE /api/v1/task/:id`. After any change, context refreshes tasks so Dashboard stays in sync.

4) UI behavior
- `Dashboard.jsx` lists tasks and filters them by a search box (case‑insensitive title search).
- `TaskCard.jsx` + modal components show task details or edit form with category styling (`utils/constant.js`).
- `Navbar.jsx` reflects auth state from context; `logoutHandler` wipes the token and navigates to Login.

### Data flow (request/response)

- Frontend (Axios) → Backend (Express) → MongoDB (Mongoose) → Backend → Frontend UI update
- Auth header: every protected request includes `user: <MongoDB ObjectId>`

```
POST /api/v1/login            { email, password }       → 200 { token }
GET  /api/v1/profile          header: user=token        → 200 user (no password)
GET  /api/v1/all-task         header: user=token        → 200 Task[]
POST /api/v1/add-task         header: user=token, body  → 200 { message }
PUT  /api/v1/task/:id         header: user=token, body  → 200 { message }
DELETE /api/v1/task/:id       header: user=token        → 200 { message }
```

## Folder structure

```
.
├─ BACKEND/
│  ├─ index.js            # Loads .env, connects DB, starts server
│  └─ src/
│     ├─ app.js           # Express app, CORS, JSON, routes mounted at /api/v1
│     ├─ routes.js        # /register, /login, /profile, tasks CRUD
│     ├─ db.config.js     # ConnectDb() using MONGO_URI
│     └─ models/
│        ├─ user.model.js # name, email (unique), password (plaintext for demo)
│        └─ task.model.js # title, description, category, user ref
│
├─ FRONTED/                # React + Vite + Tailwind
│  ├─ vite.config.js
│  ├─ src/
│  │  ├─ App.jsx, main.jsx
│  │  ├─ pages/ (Login, Register, Dashboard, AddTask)
│  │  ├─ components/ (TaskCard, TaskView, TaskUpdateView, etc.)
│  │  └─ utils/axiosClient.js (baseURL)
│  └─ public/
└─ package.json            # Root (dotenv dependency only)
```

## Run it locally (Windows/PowerShell)

Prerequisites:
- Node.js 18+ and npm
- MongoDB running locally (or Atlas connection string)

1) Backend (Express)

Create `BACKEND/.env` with your connection string and preferred port. The frontend currently expects 4500.

```powershell
# BACKEND/.env
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
PORT=4500
```

Install and start:

```powershell
cd BACKEND
npm install
npm run dev    # or: npm start
```

The API runs at http://localhost:4500 (if PORT=4500).

2) Frontend (React + Vite)

```powershell
cd FRONTED
npm install
# Optional: create .env.local with VITE_API_BASE_URL for local overrides
# echo "VITE_API_BASE_URL=http://localhost:4500" > .env.local
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

The frontend reads `VITE_API_BASE_URL` and appends `/api/v1` automatically. If the variable is not set, it defaults to `http://localhost:4500`.

## API overview

Base URL: `http://localhost:<PORT>/api/v1`

- POST `/register`      → Body `{ name, email, password }` → 201 `{ message, token }`
- POST `/login`         → Body `{ email, password }` → 200 `{ message, token }`
- GET  `/profile`       → Header `user: <token>` → 200 user (no password)
- POST `/add-task`      → Header `user`, Body `{ title, description, category }` → 200 `{ message }`
- GET  `/all-task`      → Header `user` → 200 `Task[]`
- GET  `/task/:id`      → Header `user` → 200 `Task`
- PUT  `/task/:id`      → Header `user`, Body `{ title, description, category }` → 200 `{ message }`
- DELETE `/task/:id`    → Header `user` → 200 `{ message }`

Task shape (simplified):
```
{
  _id: ObjectId,
  title: string,
  description: string,
  category: string,
  user: ObjectId (ref user)
}
```

## Design choices and notes

- Minimal auth for learning: the token is just the Mongo user `_id` sent in a header named `user`. This is easy to trace and great for demoing data flow.
- Plaintext passwords (demo only): easy to get started. For production you’d hash (bcrypt), add JWT/session, and use proper auth middleware.
- Context‑driven UI: a single source of truth for user and tasks makes the Navbar and Dashboard react instantly to changes.
- Tailwind via Vite plugin: fast styling with class utilities and instant HMR.

## Troubleshooting

- 400 "Login First" or "Enter valid ID" → Ensure you’re sending `user: <token>` header. The value is the token returned by register/login.
- Frontend can’t reach API → Confirm backend is running and `VITE_API_BASE_URL` points to the backend host (the code appends `/api/v1`).

## Deploy to Render

This repo includes a `render.yaml` blueprint to deploy both services:

- A Web Service for the API (`BACKEND/`) with Node
- A Static Site for the frontend (`FRONTED/`)

Quick steps:

1) Push this repo to GitHub.
2) In Render, New → Blueprint → point to the repo root.
3) Render will detect `render.yaml` and create two services:
   - `task-manager-api` (web): rootDir `BACKEND`, start `npm start`
   - `task-manager-frontend` (static): rootDir `FRONTED`, build `npm install && npm run build`, publish `dist/`
4) The blueprint wires `VITE_API_BASE_URL` in the Static Site to the Web Service URL, so the frontend calls the backend automatically. No hard-coded localhost in production.

If you prefer manual setup instead of the blueprint:

- Backend (Web Service)
  - Root Directory: `BACKEND`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment Variables: set `MONGO_URI` and optionally `PORT` (Render provides `PORT` automatically)

- Frontend (Static Site)
  - Root Directory: `FRONTED`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`
  - Environment Variable: `VITE_API_BASE_URL` = your backend service URL (e.g., `https://task-manager-api.onrender.com`)

Common Render error explained:

> npm error Missing script: "dev"

This happens when a Render service is pointed at the repo root and tries to run `npm run dev` where no such script exists. Fix by setting the Root Directory to `BACKEND` with Start Command `npm start`, or use the provided `render.yaml` blueprint.
- Mongo connect issues → Validate `MONGO_URI` and that MongoDB is running.

## Roadmap (nice next steps)

- Hash passwords (bcrypt) and switch to JWT auth
- Add authorization checks per route and better error messages
- Input validation improvements (cele/joi/zod)
- Unit/integration tests and CI
- Docker for easy dev setup

## License

ISC (per `BACKEND/package.json`). Consider adding a root `LICENSE` file.
