# Escape Room: Code Challenge

A timed coding game built with Next.js. Pick a difficulty and a language, then solve four programming stages before the clock runs out. Finished runs are saved to a PostgreSQL leaderboard.

**Live:** https://cse3cwa-escape-room.onrender.com/escape-room
(free hosting, so the first load can take up to a minute)

Built for CSE3CWA (Web Application Development) at La Trobe University.

## How it works

| Difficulty | Time limit |
|---|---|
| Easy | 45 minutes |
| Medium | 30 minutes |
| Hard | 20 minutes |

- Languages: JavaScript, Python or C++
- 4 progressive stages with an in-browser code editor
- Hints, pause, progress bar and a game-over screen
- Each completed run records time, attempts and hints used
- Leaderboard with filters for difficulty and language, plus overall stats

## Tech stack

Next.js 15 · React 19 · TypeScript · Prisma · PostgreSQL · Docker · docker-compose · Render

## API

| Route | Purpose |
|---|---|
| `POST /api/scores/create` | Save a finished run |
| `GET /api/scores/list` | Leaderboard entries |
| `GET /api/scores/stats` | Aggregate stats |

## Run it locally

With Docker (app + Postgres in one command):

```bash
cp .env.example .env
docker-compose up -d
```

Without Docker:

```bash
npm install
npx prisma migrate dev
npm run dev
```

More detail in [DOCKER_README.md](DOCKER_README.md).

## Other pages

The home page is an earlier assignment: a tab builder that lets you create up to 15 tabs and export them as a standalone HTML file.

## Author

Nishant Singh · [github.com/nishant0178](https://github.com/nishant0178)
