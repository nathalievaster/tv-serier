'use strict';

const seriesController = require('../controllers/serie.controller');

const routes = [
    {
        method: 'GET',
        path: '/series',
        handler: seriesController.getAll
    },
    {
        method: 'GET',
        path: '/series/{id}',
        handler: seriesController.getOne
    },
    {
        method: 'POST',
        path: '/series',
        handler: seriesController.create
    },
    {
        method: 'PUT',
        path: '/series/{id}',
        handler: seriesController.update
    },
    {
        method: 'DELETE',
        path: '/series/{id}',
        handler: seriesController.remove
    }
];

module.exports = routes;
