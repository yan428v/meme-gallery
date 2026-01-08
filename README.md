# Live Demo: [http://18.222.201.44:3000](http://18.222.201.44:3000)

## Meme Gallery

A full-stack web application for browsing and editing memes with infinite scroll.

## Tech Stack

- **Backend**: NestJS, MongoDB, Mongoose, Swagger
- **Frontend**: Next.js 16, React 19, CSS Modules
- **Infrastructure**: Docker, Docker Compose

## Features

- Infinite scroll with cursor-based pagination (10 items per page)
- Edit meme names via modal dialog
- Auto-seeding from imgflip API on first launch
- Health check endpoint with MongoDB status
- Full API documentation via Swagger

## Quick Start

### Using Docker (Recommended)

```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/v1
- Swagger Docs: http://localhost:3001/api/docs
- Mongo Express: http://localhost:8081 (admin/pass)

### Local Development

#### Prerequisites
- Node.js 20+
- MongoDB running locally

#### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/memes?limit=10&cursor=<id>` | Get paginated memes |
| PATCH | `/api/v1/memes/:id` | Update meme name |

## Project Structure

```
meme-gallery/
├── backend/
│   └── src/
│       ├── common/          # Shared components (filters, interceptors, DTOs)
│       ├── config/          # Configuration and validation
│       └── modules/
│           ├── health/      # Health check module
│           └── memes/       # Memes CRUD module
├── frontend/
│   └── src/
│       ├── app/             # Next.js App Router pages
│       ├── components/
│       │   ├── features/    # Feature-specific components
│       │   └── ui/          # Reusable UI components
│       ├── hooks/           # Custom React hooks
│       ├── services/        # API client
│       ├── types/           # TypeScript types
│       └── utils/           # Utility functions
└── docker-compose.yml
```

## Environment Variables

See `.env.example` files in root, `/backend`, and `/frontend` directories.
