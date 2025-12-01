'use strict';

const { query } = require('../db');

const SeriesModel = {

    async getAll() {
        const result = await query('SELECT * FROM series ORDER BY id');
        return result.rows;
    },

    async getOne(id) {
        const result = await query('SELECT * FROM series WHERE id = $1', [id]);
        return result.rows[0]; // returnera bara objektet och inte arrayen
    },

    async create(title, seasons, completed) {
        const result = await query(
            `INSERT INTO series (title, seasons, completed)
             VALUES ($1, $2, $3)
             RETURNING *`,
             [title, seasons, completed]
        );
        return result.rows[0];
    },

    async update(id, title, seasons, completed) {
        const result = await query(
            `UPDATE series 
             SET title = $1, seasons = $2, completed = $3 
             WHERE id = $4 
             RETURNING *`,
            [title, seasons, completed, id]
        );
        return result.rows[0];
    },

    async remove(id) {
        const result = await query(
            `DELETE FROM series WHERE id = $1 RETURNING *`, // RETURNING för att få tillbaka den raderade raden
            [id]
        );
        return result.rows[0];
    }
};

module.exports = SeriesModel;
