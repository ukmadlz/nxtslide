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
var HapiAuthCookie = require('hapi-auth-cookie');
var Inert = require('inert');
var Vision = require('vision');
var Yar = require('yar');
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
  // host: process.env.VCAP_APP_HOST || 'localhost',
  port: process.env.VCAP_APP_PORT || process.env.PORT || 3000,
});

// Hapi Log
server.log(['error', 'database', 'read']);

// Register Hapi Plugins
var hapiErr = function(err) {
  if (err) console.log(err);
}
server.register(Inert, hapiErr);
server.register(Vision, hapiErr);
server.register({
    register: Yar,
    options: {
        storeBlank: false,
        cookieOptions: {
            password: 'cookie_encryption_password',
            isSecure: false
        }
    }
}, hapiErr);

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

// Auth
server.register(Bell, hapiErr);
server.register(HapiAuthCookie, hapiErr);
server.auth.strategy('nxtslide-cookie', 'cookie', {
    cookie: 'nxtslide-cookie',
    password: 'cookie_encryption_password',
    redirectTo: '/',
    isSecure: process.env.HTTPS
});
server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'cookie_encryption_password',
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    isSecure: process.env.HTTPS
});
server.register(require('./routes/auth'), hapiErr);

// dashboard
server.register(require('./routes/dashboard'), hapiErr);

// controller
server.register(require('./routes/controller'), hapiErr);

// Default
server.route({
  method: 'GET',
  path: '/',
  config: {
    auth: {
      mode: 'try',
      strategy: 'nxtslide-cookie'
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, reply) => {
      reply.view('Default', {
        title: 'Start | Hapi ' + request.server.version,
        message: 'Yo Bro!'
      });
    }
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
