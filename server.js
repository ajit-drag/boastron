var restify = require('restify');
var builder = require('botbuilder');



var server = restify.createServer();

var chatConnector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(chatConnector);
var nlpModel = "https://api.projectoxford.ai/luis/v1/application?id=5473dc3e-47b9-4d60-9f4f-3f876653946e&subscription-key=7d28d1d8006a4a2b8cf7945c316e8116&q=";
var recognizer = new builder.LuisRecognizer(nlpModel);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', intent);

intent.matches('greeting', builder.DialogAction.send("Hello User !"));
intent.onDefault(builder.DialogAction.send("I am not saying anything about this !!"));

server.post('/api/messages', chatConnector.listen());

server.get('/', restify.serveStatic({
    'directory': '.',
    'default': './docs/index.html'
}));
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});