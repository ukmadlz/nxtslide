'use strict';

// Required Libs
var Hapi = require('hapi');
var Bell = require('bell');
var Path = require('path');

var server = new Hapi.Server();

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

// Start Hapi
server.start(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server running at:', server.info.uri);
  }
});
