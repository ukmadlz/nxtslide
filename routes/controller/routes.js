// Controller Sites

module.exports = function(server, pusher) {

  server.route({
    method: 'GET',
    path: '/controller/{id}',
    config: {
      auth: {
        mode: 'required',
        strategy: 'nxtslide-cookie'
      },
      handler: (request, reply) => {
        reply.view('Controller');
      },
    },
  });

  // Trigger direction
  server.route({
    method: 'POST',
    path: '/controller/{id}/{direction}',
    config: {
      // auth: 'nxtslide-cookie',
      handler: (request, reply) => {
        pusher.trigger('deck_'+request.params.id, 'controller', {
          "direction": request.params.direction
        });
        reply({});
      },
    },
  });

}
