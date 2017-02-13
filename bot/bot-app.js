var builder = require('botbuilder');

/*importing intents */
var greeting = require('./intents/greeting');
var introduction = require('./intents/introduction');

var chatConnector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(chatConnector);

var nlpModel = "https://api.projectoxford.ai/luis/v2.0/apps/5473dc3e-47b9-4d60-9f4f-3f876653946e?subscription-key=7d28d1d8006a4a2b8cf7945c316e8116&verbose=true";
var recognizer = new builder.LuisRecognizer(nlpModel);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });

bot.library(require('./dialogs/profile'));

bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));
bot.use(builder.Middleware.firstRun({ version: 0.2, dialogId: 'profile:/', upgradeDialogId: 'profile:/' }));

bot.dialog('/', intent);


intent.matches('greeting', function(session) { greeting(session, builder); });
intent.matches('introduction', function(session) { introduction(session, builder) });
intent.onDefault(builder.DialogAction.send("Sorry but sometime I don't know what you want and this is that exact moment !!"));

module.exports = {
    chatConnector: chatConnector
};