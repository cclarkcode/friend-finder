//Outside Requirements

 var express = require('express');
 var bodyParser = require('body-parser');
 var path = require('path');
 var html = require('./app/routing/htmlRoutes.js');
 var api = require('./app/routing/apiRoutes.js');

//Set up express app and allow for data parsing
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./app/public'));

app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});

app.use('/', html);
app.use('/api/', api);


