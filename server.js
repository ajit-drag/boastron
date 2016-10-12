var restify = require('restify');
var builder = require('builder');



var server = restify.createServer();
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


server.post('/api/messages', connector.listen());
server.get('/', restify.serveStatic({
    'directory': '.',
    'default': './docs/index.html'
}));
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});