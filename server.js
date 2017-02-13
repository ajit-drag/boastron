var express = require('express');

var router = require('./route.js');

var server = express();

function logResponseBody(req, res, next) {
    var oldWrite = res.write,
        oldEnd = res.end;

    var chunks = [];

    res.write = function(chunk) {
        chunks.push(new Buffer(chunk));

        oldWrite.apply(res, arguments);
    };

    res.end = function(chunk) {
        if (chunk)
            chunks.push(new Buffer(chunk));

        var body = Buffer.concat(chunks).toString('utf8');
        console.log(req.path, body);

        oldEnd.apply(res, arguments);
    };

    next();
}

app.use(logResponseBody);
server.use('/', router);
server.use('/', express.static('site'));

server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('Server is listening..');
});