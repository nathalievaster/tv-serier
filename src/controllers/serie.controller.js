'use strict';

// Importera SeriesModel
const SeriesModel = require('../models/serie.model');

// Importera Joi-scheman
const {
    createSeriesSchema,
    updateSeriesSchema
} = require('../validation/serieSchemas');


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

    // Skapa ny serie (POST)
    async create(request, h) {
        const payload = request.payload || {};

        // JOI-validering
        const { error, value } = createSeriesSchema.validate(payload, {
            abortEarly: false
        });

        if (error) {
            const details = error.details.map(d => d.message);

            return h
                .response({
                    error: 'Valideringsfel i inskickad data.',
                    details: details
                })
                .code(400);
        }

        const { title, seasons, completed } = value;

        try {
            const newSerie = await SeriesModel.create(
                title,
                seasons,
                completed ?? false
            );

            return h.response(newSerie).code(201);
        } catch (err) {
            console.error('Error in create:', err);
            return h
                .response({ error: 'Ett fel uppstod när serien skulle skapas.' })
                .code(500);
        }
    },

    // Uppdatera en befintlig serie (PUT)
    async update(request, h) {
        const { id } = request.params;
        const payload = request.payload || {};

        // JOI-validering
        const { error, value } = updateSeriesSchema.validate(payload, {
            abortEarly: false
        });

        if (error) {
            const details = error.details.map(d => d.message);

            return h
                .response({
                    error: 'Valideringsfel i inskickad data.',
                    details: details
                })
                .code(400);
        }

        const { title, seasons, completed } = value;

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
