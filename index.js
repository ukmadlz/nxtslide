'use strict';

// Load in Babel
require('babel-core/register')({
    presets: ['react', 'es2015']
});

// Load in config
require('dotenv').load();

// Required Libs
var Hapi = require('hapi');
var Bell = require('bell');
var Inert = require('inert');
var Vision = require('vision');
var Path = require('path');
var dateFormat = require('dateformat');

// format
var format = "dd mmm HH:MM:ss";

// Instantiate the server
var server = new Hapi.Server({
  debug: {
    request: ['error', 'good'],
  },
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public'),
      },
    },
  },
});

// Set Hapi Connections
server.connection({
  host: process.env.VCAP_APP_HOST || 'localhost',
  port: process.env.VCAP_APP_PORT || 3000,
});

// Hapi Log
server.log(['error', 'database', 'read']);

// Register Hapi Plugins
var hapiErr = function(err) {
  if (err) console.log(err);
}
server.register(Inert, hapiErr);
server.register(Vision, hapiErr);

// View handling
server.views({
    engines: {
        jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'views'
});

// Static site
server.register(require('./routes/static'), hapiErr);

// Default
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply.view('Default', {
      title: 'Start | Hapi ' + request.server.version,
      message: 'Yo Bro!'
    });
  }
});

// Start Hapi
server.start(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);
  }
});
