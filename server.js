var express = require('express');
var builder = require('botbuilder');

/*importing intents */
var greeting = require('./intents/greeting');
var introduction = require('./intents/introduction');

var server = express();

var chatConnector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(chatConnector);
var nlpModel = "https://api.projectoxford.ai/luis/v1/application?id=5473dc3e-47b9-4d60-9f4f-3f876653946e&subscription-key=7d28d1d8006a4a2b8cf7945c316e8116&q=";
var recognizer = new builder.LuisRecognizer(nlpModel);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', intent);

intent.matches('greeting', function(session) { greeting(session, builder) });
intent.matches('introduction', function(session) { introduction(session, builder) });
intent.onDefault(builder.DialogAction.send("Sorry but sometime I don't know what you want and this is that exact moment !!"));

server.post('/api/messages', chatConnector.listen());

server.use('/', express.static('docs'));
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('Server is listening..');
});