/**
 * @file server proxy
 * @author Dewyzee<fe.dewyzee@gmail.com>
 */

require('./check-versions')();

const config = require('../config');
const devConfig = require('../config/dev.env');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = devConfig.NODE_ENV;
};

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');
const mockMiddleware = require('./middleware/mock');

const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf');


const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;

const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
});

app.use(hotMiddleware);

Object.keys(proxyTable).forEach(function (context) {
    const filter = (pathname, req) => {
        const referer = req.headers.referer;
        return !/[?&](?:ed|enable_debug)\b/i.test(referer);
    };
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    options.logLevel = 'warn';
    app.use(context, proxyMiddleware(filter, options));
    app.use(context, mockMiddleware);
});

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

let _resolve;
let _reject;
let readyPromise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
});


let server;
let portfinder = require('portfinder');
portfinder.basePort = port;

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    portfinder.getPort((err, port) => {
        if (err) {
            _reject(err);
        }
        process.env.PORT = port;
        const uri = 'http://localhost:' + port;
        console.log('> Listening at ' + uri + '\n');
        // when env is testing, don't need open it
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            opn(uri);
        }
        server = app.listen(port);
        _resolve();
    });
});

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
};