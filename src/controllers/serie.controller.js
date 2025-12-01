'use strict';

// Importera SeriesModel
const SeriesModel = require('../models/serie.model');

// Controller-objektet med alla handlers
const seriesController = {

    // Hämta alla serier
    async getAll(request, h) {
        try {
            const series = await SeriesModel.getAll();
            return h.response(series).code(200);
        } catch (err) {
            console.error('Error in getAll:', err);
            return h
                .response({ error: 'Ett fel uppstod när serier skulle hämtas.' })
                .code(500);
        }
    },

    // Hämta en specifik serie
    async getOne(request, h) {
        const { id } = request.params;

        try {
            const serie = await SeriesModel.getOne(id);

            if (!serie) {
                return h
                    .response({ error: `Ingen serie med id ${id} hittades.` })
                    .code(404);
            }

            return h.response(serie).code(200);
        } catch (err) {
            console.error('Error in getOne:', err);
            return h
                .response({ error: 'Ett fel uppstod när serien skulle hämtas.' })
                .code(500);
        }
    },

    // Skapa ny serie
    async create(request, h) {
        const { title, seasons, completed } = request.payload || {};

        // Enkel validering (kanske lägger till JOI senare)
        if (!title || seasons === undefined) {
            return h
                .response({
                    error: 'Fälten "title" och "seasons" är obligatoriska.'
                })
                .code(400);
        }

        if (typeof seasons !== 'number') {
            return h
                .response({
                    error: '"seasons" måste vara ett nummer.'
                })
                .code(400);
        }

        try {
            const newSerie = await SeriesModel.create(
                title,
                seasons,
                completed ?? false // default = false om undefined
            );

            return h.response(newSerie).code(201);
        } catch (err) {
            console.error('Error in create:', err);
            return h
                .response({ error: 'Ett fel uppstod när serien skulle skapas.' })
                .code(500);
        }
    },

    // Uppdatera en befintlig serie
    async update(request, h) {
        const { id } = request.params;
        const { title, seasons, completed } = request.payload || {};

        // För PUT kräver vi alla fält
        if (!title || seasons === undefined || completed === undefined) {
            return h
                .response({
                    error:
                        'Fälten "title", "seasons" och "completed" är obligatoriska vid uppdatering.'
                })
                .code(400);
        }

        if (typeof seasons !== 'number') {
            return h
                .response({
                    error: '"seasons" måste vara ett nummer.'
                })
                .code(400);
        }

        if (typeof completed !== 'boolean') {
            return h
                .response({
                    error: '"completed" måste vara true eller false.'
                })
                .code(400);
        }

        try {
            const updatedSerie = await SeriesModel.update(
                id,
                title,
                seasons,
                completed
            );

            if (!updatedSerie) {
                return h
                    .response({ error: `Ingen serie med id ${id} hittades.` })
                    .code(404);
            }

            return h.response(updatedSerie).code(200);
        } catch (err) {
            console.error('Error in update:', err);
            return h
                .response({ error: 'Ett fel uppstod när serien skulle uppdateras.' })
                .code(500);
        }
    },

    // Ta bort en serie
    async remove(request, h) {
        const { id } = request.params;

        try {
            const deletedSerie = await SeriesModel.remove(id);

            if (!deletedSerie) {
                return h
                    .response({ error: `Ingen serie med id ${id} hittades.` })
                    .code(404);
            }

            return h
                .response({
                    message: 'Serien har raderats.',
                    deleted: deletedSerie
                })
                .code(200);
        } catch (err) {
            console.error('Error in remove:', err);
            return h
                .response({ error: 'Ett fel uppstod när serien skulle raderas.' })
                .code(500);
        }
    }
};

module.exports = seriesController;
