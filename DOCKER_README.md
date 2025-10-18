# Docker Setup for Escape Room Application

This application is fully dockerized with PostgreSQL database and can run with a single command.

---

## 📋 What's Included

- **Next.js Application** (Port 3000)
- **PostgreSQL Database** (Port 5432)
- **Leaderboard with Score Tracking**
- **pgAdmin Database UI** (Port 5050 - Optional)

---

## 🚀 Quick Start

### 1. Install Dependencies (Local Development)

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and change the password:
```env
POSTGRES_PASSWORD=YourSecurePassword123
```

### 3. Build and Run with Docker

```bash
# Build Docker images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app
```

### 4. Access the Application

- **Main App:** http://localhost:3000
- **Leaderboard:** http://localhost:3000/leaderboard
- **Escape Room:** http://localhost:3000/escape-room

---

## 🐳 Docker Commands

### Start/Stop

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f app
```

### Database Management

```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U escaperoom_user -d escaperoom_db

# Run database migrations
docker-compose exec app npx prisma migrate deploy

# View database with pgAdmin (optional)
docker-compose --profile tools up -d
# Then visit: http://localhost:5050
```

### Rebuild After Code Changes

```bash
# Rebuild and restart
docker-compose up -d --build

# Or full rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 Database Schema

The PostgreSQL database includes a `Score` table for leaderboard tracking:

- **playerName** (optional) - Player name
- **difficulty** - easy/medium/hard
- **language** - javascript/python/cpp
- **completionTime** - Time in seconds
- **totalAttempts** - Number of attempts
- **totalHints** - Hints used
- **completedAt** - Timestamp

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000

# Change port in docker-compose.yml
ports:
  - "8080:3000"  # Use port 8080 instead
```

### Database Connection Issues

```bash
# Check if postgres is running
docker-compose ps postgres

# View postgres logs
docker-compose logs postgres

# Verify DATABASE_URL in .env matches docker-compose.yml settings
```

### Rebuild from Scratch

```bash
# Stop and remove everything (including volumes)
docker-compose down -v

# Remove all Docker images
docker system prune -a

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

---

## 📁 Docker Files

- **`Dockerfile`** - Multi-stage Next.js production build
- **`docker-compose.yml`** - Services orchestration (app + postgres + pgadmin)
- **`.dockerignore`** - Build optimization
- **`.env.example`** - Environment variables template

---

## 🗃️ Persistent Data

Database data is stored in Docker volumes and persists across container restarts:

- **`escaperoom_postgres_data`** - PostgreSQL database files
- **`escaperoom_logs`** - Application logs
- **`escaperoom_pgadmin_data`** - pgAdmin configuration

To view volumes:
```bash
docker volume ls
```

To backup database:
```bash
docker-compose exec postgres pg_dump -U escaperoom_user escaperoom_db > backup.sql
```

---

## 🌐 Environment Variables

Required in `.env` file:

```env
# Database Configuration
POSTGRES_USER=escaperoom_user
POSTGRES_PASSWORD=YourSecurePassword123
POSTGRES_DB=escaperoom_db

# Database Connection URL
DATABASE_URL="postgresql://escaperoom_user:YourSecurePassword123@postgres:5432/escaperoom_db?schema=public"

# Optional: pgAdmin
PGADMIN_EMAIL=admin@escaperoom.local
PGADMIN_PASSWORD=admin123

# Next.js
NODE_ENV=production
NEXT_PUBLIC_API_URL=/api/scores
```

---

## 💡 Tips

- Use `docker-compose up` (without `-d`) to see logs in real-time
- Use `docker-compose --profile tools up -d` to start pgAdmin
- Database data persists even when containers are stopped
- Run `docker-compose down -v` only if you want to delete all data

---

## 📚 Additional Commands

```bash
# View container resource usage
docker stats

# Execute command inside container
docker-compose exec app sh

# View all containers (including stopped)
docker ps -a

# Clean up unused resources
docker system prune
```

---

**Your application is now fully dockerized!** 🎉

Just run `docker-compose up -d` and visit http://localhost:3000
