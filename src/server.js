'use strict';

// Importerar Hapi, dotenv och initDb
const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const initDb = require('./initdb');
const seriesRoutes = require('./routes/serie.routes');
dotenv.config();

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    // Initierar databasen
    await initDb();

    // Importera routes för serier
    server.route(seriesRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();