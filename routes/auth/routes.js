// Do authentication etc

module.exports = function(server) {

  server.state('token');
  server.state('secret');
  server.auth.strategy('session', 'cookie', {
      cookie: 'sid',
      password: 'cookie_encryption_password',
      redirectTo: '/login'
  });
  server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'cookie_encryption_password',
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        isSecure: false,
    });
  server.route({
        method: ['GET', 'POST'], // Must handle both GET and POST
        path: '/login',          // The callback endpoint registered with the provider
        config: {
            auth: 'github',
            handler: (request, reply) => {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                return reply.redirect('/dashboard/');
            }
        }
    });
  server.route({
      method: 'GET',
      path: '/logout',
      config: {
          handler: (request, reply) => {
              // Clear the cookie
              request.auth.session.clear();

              return reply.redirect('/');
          }
      }
  });

}
