const express = require('express')
const app = express()
var path = require('path');
var port = process.env.YOUR_PORT || process.env.PORT || 3000;
var host = process.env.YOUR_HOST || '0.0.0.0';



app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/main.html'));
});

app.get('/map', function(req, res){
    res.sendFile(path.join(__dirname + '/public/map.html'));
  });


app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname + '/public/about.html'));
  });


app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});
