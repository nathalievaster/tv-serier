'use strict';

// Ladda miljövariabler
const dotenv = require('dotenv');
// Importera pg från PostgreSQL-paketet och använd klassen Pool
const { Pool } = require('pg');

dotenv.config();

// Skapa en pool mot databasen
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // behövs ofta på Render tydligen
  }
});

// En enkel helper-funktion för att köra queries för att slippa importera pool varje gång
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  query
};
