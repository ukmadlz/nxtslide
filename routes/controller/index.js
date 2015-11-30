function register (server, options, next) {

  var Pusher = require('pusher');

  var pusher = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    encrypted: true
  });
  pusher.port = 443;

  require("./routes.js")(server, pusher);

  next();
}

var attributes = require("./package.json");

exports.register = register;
exports.register.attributes = attributes;
