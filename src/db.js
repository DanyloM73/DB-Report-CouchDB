'use strict';

const nodeCouchDB = require('node-couchdb');

require('dotenv').config();

const couch = new nodeCouchDB({
    auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    }
});

module.exports = couch;