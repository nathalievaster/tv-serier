# Tv-serier API

Ett REST API byggt med **Hapi.js** och **PostgreSQL** för att hantera tv-serier. API:t har full CRUD-funktionalitet och använder **Joi** för validering.

---

## Installation

```bash
git clone <repo-url>
cd tv-serier
npm install
```
Skapa sedan en ENV-fil:

DATABASE_URL=postgres://user:password@host:port/databasnamn
PORT=5000

Starta servern:
```bash
npm run start
```

## Databas

Tabellen skapas automatiskt via `initDb.js`.

```sql
CREATE TABLE IF NOT EXISTS series (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  seasons INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);
```

## Endpoints

### Hämta alla serier
GET /series

### Hämta en serie
GET /series/{id}

### Skapa serie
POST /series

Body-exempel:

{
  "title": "Breaking Bad",
  "seasons": 5,
  "completed": true
}

### Uppdatera serie
PUT /series/{id}

Body-exempel:

{
  "title": "Loki",
  "seasons": 2,
  "completed": false
}

### Radera serie
DELETE /series/{id}

---

## Tekniker
- Node.js
- Hapi.js
- PostgreSQL
- pg
- Joi
- Render (för deployment)