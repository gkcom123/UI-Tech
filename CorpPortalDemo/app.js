var express = require('express'),
http = require('http');


var app = express()
.use(express.bodyParser())
.use(express.static('app'));


app.get('/*', function  (req, res) {
        res.json(404, {status: 'not found'});
        });

http.createServer(app).listen(3000, function () {
                              console.log("Server ready at http://localhost:3000");
                              });