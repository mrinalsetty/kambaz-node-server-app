# Kambaz Node Server

Express.js server providing RESTful APIs for the Kambaz learning platform.

## Features

- Users: signup, signin, profile, signout, update
- Courses: list all, list current user enrolled, create, update, delete
- Modules: per-course CRUD with lesson stubs
- Assignments: per-course CRUD
- Enrollments: enroll/unenroll current user, list enrollments
- Session-based auth (cookie) with CORS credentials

## Environment Variables (.env)

```
PORT=4000
SESSION_SECRET=kambaz_dev_secret
CLIENT_URL=http://localhost:3000
SERVER_ENV=development
```

Set `SERVER_ENV=production` and `CLIENT_URL` to your deployed Next.js origin for production (HTTPS required for secure cookies).

## Installation

```
npm install
npm start
```

Server runs on `http://localhost:4000` by default.

## Core Endpoints

```
GET    /api/users/profile
POST   /api/users/signup
POST   /api/users/signin
POST   /api/users/signout
PUT    /api/users/:userId      (update user)

GET    /api/courses
GET    /api/users/current/courses
POST   /api/users/current/courses
PUT    /api/courses/:courseId
DELETE /api/courses/:courseId

GET    /api/courses/:courseId/modules
POST   /api/courses/:courseId/modules
PUT    /api/modules/:moduleId
DELETE /api/modules/:moduleId

GET    /api/courses/:courseId/assignments
POST   /api/courses/:courseId/assignments
PUT    /api/assignments/:assignmentId
DELETE /api/assignments/:assignmentId

GET    /api/enrollments
GET    /api/users/current/enrollments
POST   /api/courses/:courseId/enroll
DELETE /api/courses/:courseId/enroll
```

## CORS & Sessions

Configured to allow credentials from `CLIENT_URL`. In production ensure HTTPS and `sameSite: 'none'` is active (automatically when `SERVER_ENV !== 'development'`).

## Development Workflow

1. Start server
2. Start Next.js client with `NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000`
3. Sign up, sign in, verify profile
4. Create courses (auto-enrolled), enroll/unenroll, manage modules/assignments
5. (Optional) Run multi-user session test: `node scripts/sessionTest.mjs`

## Roadmap

- Persistent database (Mongo/Postgres)
- Role-based access control
- People listing per course
- Enhanced assignment metadata (rubrics, submissions)

## License

Internal educational project – no external distribution license included.
