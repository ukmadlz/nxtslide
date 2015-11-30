// Controller Sites

module.exports = function(server, pusher) {

  server.route({
    method: 'GET',
    path: '/controller/{id}',
    handler: (request, reply) => {
      reply.view('Controller');
    }
  });

  // Trigger direction
  server.route({
    method: 'POST',
    path: '/controller/{id}/{direction}',
    handler: (request, reply) => {
      pusher.trigger('deck_'+request.params.id, 'controller', {
        "direction": request.params.direction
      });
      reply({});
    },
  });

}
