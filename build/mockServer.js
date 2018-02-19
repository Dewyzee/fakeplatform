/**
 * @file mock server
 * @author Dewyzee<fe.dewyzee@gmail.com>
 */

const express = require('express');
const mockMiddleware = require('./middleware/mock');

const config = require('../config');
const proxyTable = config.dev.proxyTable;

const app = express();

Object.keys(proxyTable).forEach(function (context) {
    app.use(context, mockMiddleware);
});

app.listen(3000);