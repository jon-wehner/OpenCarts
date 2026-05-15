# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenCarts is a platform for users to find local food carts, make reservations, and leave reviews. It is a monorepo with an Express/Sequelize backend and a React/TypeScript/Redux frontend.

## Commands

### Development

Run each in a separate terminal:

```bash
# Backend (runs on port 6969 with nodemon)
cd backend && npm start

# Frontend (proxies to localhost:6969)
cd frontend && npm start
```

### Testing

```bash
# Backend integration tests (resets the test DB first, then runs Jest)
cd backend && npm test

# Run a single backend test file
cd backend && NODE_ENV=test npx dotenv jest __tests__/reviews.test.js

# Frontend tests (React Testing Library)
cd frontend && npm test

# Frontend coverage
cd frontend && npm run coverage
```

### Database

```bash
# Reset DB (undo all migrations, re-migrate, re-seed)
cd backend && npm run db:reset

# Run migrations / seeds individually
cd backend && npx dotenv sequelize-cli db:migrate
cd backend && npx dotenv sequelize-cli db:seed:all
```

### Installing Dependencies

```bash
# Install both frontend and backend from root
npm install
```

## Architecture

### Backend (`backend/`)

Express REST API mounted under `/api`. Entry point is `bin/www`; the app is configured in `app.js`.

**Middleware chain** (app.js): morgan → cookie-parser → json body parser → CORS (dev only) → csurf → helmet → routes → 404 handler → Sequelize validation error handler → generic error handler.

**Auth** (`utils/auth.js`): JWT stored in an httpOnly `token` cookie. `setTokenCookie` signs and sets it. `restoreUser` verifies the cookie and attaches `req.user`. `requireAuth` is a two-middleware array `[restoreUser, guard]` applied to protected routes.

**CSRF**: The `csurf` middleware issues an `XSRF-TOKEN` cookie. The frontend reads it and sends it back as an `XSRF-Token` header on all non-GET requests (handled in `frontend/src/store/csrf.js`). The `/api/csrf/restore` route exists to force-issue the cookie on app load.

**Models** (`db/models/`):
- `User` — has many `Reservation`, has many `Review`. Has Sequelize scopes (`defaultScope` excludes password/email, `currentUser` excludes password, `loginUser` includes all) and instance methods `toSafeObject`, `validatePassword`, plus static `login`/`signup`.
- `Cart` — belongs to `Cuisine` and `State`. Fields: name, address, priceLevel (1–4), cuisineId, stateId, city, zipCode, imageUrl.
- `Reservation` — belongs to `Cart` and `User`, has one `Review`. Tracks `reviewed` boolean (set to `true` when a review is submitted).
- `Review` — belongs to `Cart`, `User`, and `Reservation`. Rating 1–5.
- `Cuisine`, `State` — lookup tables.

**API routes** (`routes/api/`):
- `GET /api/carts` — all carts with State and Cuisine eager-loaded
- `POST /api/carts` — search by `{ query }` matching cart name or cuisine name (case-insensitive `iLike`)
- `POST /api/reservations/:id/available` — returns available 15-minute timeslots in a ±2-hour window around the requested time; a slot is dropped if it already has ≥1 reservation
- `POST /api/reservations/new`, `PATCH /api/reservations/:id`, `DELETE /api/reservations/:id`
- `GET /api/reviews/:id` (by cartId), `POST /api/reviews`
- `GET/POST/DELETE /api/session` — login, restore current user, logout
- `POST /api/users` — signup

**Config**: Environment variables are read in `config/index.js`. Test environment uses `DB_TESTURI`/`DB_TESTDB`; production uses the `DATABASE_URL` env variable with SSL.

### Frontend (`frontend/src/`)

Create React App with TypeScript. Proxies all `/api` requests to `http://localhost:6969`.

**Routes** (App.tsx):
- `/` → `BookingArea` (landing/search page)
- `/search` → `SearchResults`
- `/profile` → `UserProfile`

**Redux store** (`store/`): Configured with Redux Toolkit. Four slices:
- `session` — current user and auth errors
- `carts` — cart data
- `reservations` — reservation data
- `reviews` — review data

All API calls go through the custom `fetch` wrapper in `store/csrf.js`, which injects the `XSRF-Token` header from the `XSRF-TOKEN` cookie on non-GET requests and parses JSON onto `res.data`.

**TypeScript interfaces** (`interfaces.ts`): `Cart`, `Cuisine`, `State`, `Reservation` (both `ExistingReservation` and `NewReservation`), `Review`, `User`, `Error`, `CustomResponse`.

**Typing convention**: `RootState` and `AppDispatch` are exported from `store/index.ts` and used for typed `useSelector`/`useDispatch` hooks.

### CI/CD

Github actions runs backend tests (`cd backend && npm run test`) and frontend coverage on all branches except `main`.
