// Static Sites

module.exports = function(server) {

  server.route({
    method: 'GET',
    path: '/dashboard',
    config: {
      auth: 'nxtslide-cookie',
      handler: (request, reply) => {
        reply({});
      }
    }
  });

}
