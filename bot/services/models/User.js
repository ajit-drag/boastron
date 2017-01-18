var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** To be used when multiple channels will come */
var channelSchema = new Schema({
    channelId: String,
    serviceUrl: String,
    userId: String
});

var userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    channel: channelSchema
});

var User = mongoose.model('User', userSchema);

module.exports = User;