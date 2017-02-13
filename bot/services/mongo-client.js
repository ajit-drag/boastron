var mongoose = require('mongoose');

var User = require('./models/User');

var mlabUsername = process.env.MLAB_USERNAME;
var mlabPassword = process.env.MLAB_PASSWORD;

console.log(mlabUsername, mlabPassword);
mongoose.connect('mongodb://' + mlabUsername + ':' + mlabPassword + '@ds139448.mlab.com:39448/boastron');
mongoose.connection.on('connected', function() {
    console.log("Connected to database");
});

var registerUser = function(user, callback) {
    var newUser = new User({
        name: user.name,
        email: user.email,
        phone: user.phone,
        channel: user.channel
    });
    console.log("User Registration, user:", user);
    newUser.save(function(err, addedUser, numberAffected) {
        console.log(err);
        if (err) return callback(err, { success: false, result: { message: "Some error occured." } })
        if (numberAffected === 1) return callback(err, { success: true, result: { message: "Registration successfull." } });
        else return callback(err, { success: false, result: { message: "Registration failed." } });
    });
};

module.exports = {
    registerUser: registerUser
};