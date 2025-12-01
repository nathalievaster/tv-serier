'use strict';

const Joi = require('joi');

// Schema för att skapa en serie (POST)
const createSeriesSchema = Joi.object({
    title: Joi.string().min(1).required().messages({
        'string.base': '"title" måste vara en text.',
        'string.empty': '"title" får inte vara tom.',
        'any.required': '"title" är obligatoriskt.'
    }),
    seasons: Joi.number().integer().min(1).required().messages({
        'number.base': '"seasons" måste vara ett nummer.',
        'number.integer': '"seasons" måste vara ett heltal.',
        'number.min': '"seasons" måste vara minst 1.',
        'any.required': '"seasons" är obligatoriskt.'
    }),
    completed: Joi.boolean().optional().messages({
        'boolean.base': '"completed" måste vara true eller false.'
    })
});

// Schema för att uppdatera en serie (PUT)
const updateSeriesSchema = Joi.object({
    title: Joi.string().min(1).required().messages({
        'string.base': '"title" måste vara en text.',
        'string.empty': '"title" får inte vara tom.',
        'any.required': '"title" är obligatoriskt.'
    }),
    seasons: Joi.number().integer().min(1).required().messages({
        'number.base': '"seasons" måste vara ett nummer.',
        'number.integer': '"seasons" måste vara ett heltal.',
        'number.min': '"seasons" måste vara minst 1.',
        'any.required': '"seasons" är obligatoriskt.'
    }),
    completed: Joi.boolean().required().messages({
        'boolean.base': '"completed" måste vara true eller false.',
        'any.required': '"completed" är obligatoriskt vid uppdatering.'
    })
});

module.exports = {
    createSeriesSchema,
    updateSeriesSchema
};
