# Snippet Vault

This repository contains a NestJS backend and a Next.js frontend for a snippet management app.

## Local setup

### 1. Install dependencies

Use `pnpm` if available, otherwise use `npm`.

Backend:
```bash
cd backend
pnpm install
```

Frontend:
```bash
cd frontend
pnpm install
```

If you do not have `pnpm`, replace `pnpm install` with `npm install`.

### 2. Environment variables

Create a `.env` file from the example in the repo root or in the frontend directory for Next.js.

```bash
cp .env.example .env
```

#### Required variables

Root example includes both backend and frontend values.

- `MONGO_URI` — MongoDB connection string for the backend.
- `NEXT_PUBLIC_API_URL` — frontend API base URL used by the app.

### 3. Run locally

Start the backend:
```bash
cd backend
pnpm start:dev
```

Start the frontend:
```bash
cd frontend
pnpm dev
```

The frontend will typically be available at `http://localhost:3000`.
The backend will typically run at `http://localhost:5000`.

## API reference

The backend exposes the following endpoints under `/snippets`.

Base URL example:
```bash
http://localhost:5000/snippets
```

### Get all snippets

```bash
curl "http://localhost:5000/snippets"
```

### Get a snippet by ID

```bash
curl "http://localhost:5000/snippets/<id>"
```
### Query parameters

- `q` — search text
- `tag` — filter by tag
- `page` — page number
- `limit` — page size

Example:
```bash
curl "http://localhost:5000/snippets?q=git&tag=nextjs&page=1&limit=10"
```

## Build and production

### Backend production build

```bash
cd backend
pnpm build
pnpm start:prod
```

By default, the production backend listens on port `5000` unless `PORT` is set.

### Frontend production build

```bash
cd frontend
pnpm build
pnpm start
```

The frontend uses `NEXT_PUBLIC_API_URL` to connect to the backend in production.

## Notes

- If you use `npm`, replace `pnpm` with `npm`.
- Ensure MongoDB is running and `MONGO_URI` is valid before starting the backend.
- You can also use a `.env.local` file in the `frontend` folder for Next.js-specific overrides.
