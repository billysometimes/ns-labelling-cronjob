var express = require("express"); 
var fs = require('fs');
var app = express();

// Set the Server Port
var PORT  = process.env.PORT || 8080

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', 'localhost', port);
});

app.get('/metrics', function (req, res) {
  let path='/var/www/html/unlabeled';
  let metrics = {
    count: 0,
    namespaces: []
  }
  if (fs.existsSync(path)) {
    let namespaces = fs.readFileSync('unlabeled').toString()
			.split('\n').filter( n => n);
    metrics.count = namespaces.length;
    metrics.namespaces = namespaces;
  }
  res.json(metrics);
});
