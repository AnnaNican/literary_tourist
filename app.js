const express = require('express')
const app = express()
// const port = 3000
var path = require('path');
var port = process.env.YOUR_PORT || process.env.PORT || 3000;
var host = process.env.YOUR_HOST || '0.0.0.0';



// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname + '/about.html'));
});


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});
