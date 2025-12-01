'use strict';

const { query } = require('./db');

async function initDb() {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS series (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      seasons INTEGER NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false
    );
  `;

  try {
    await query(createTableSql);
    console.log('Table "series" is ready.');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
}

module.exports = initDb;
