var express = require('express');
var builder = require('botbuilder');

/*importing intents */
var greeting = require('./intents/greeting');

var server = express();

var chatConnector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(chatConnector);

bot.dialog('/', function(session) {
    session.send("Hello my creator !!");
});

server.post('/api/messages', chatConnector.listen());

server.use('/', express.static('docs'));
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('Server is listening..');
});