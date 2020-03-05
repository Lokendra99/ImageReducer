var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var mongoose = require('mongoose');
var imageSchema = require('./app/models/image')

var imageModel = mongoose.model('images',imageSchema);


var app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

db = mongoose.connect('mongodb://localhost/myapp');


mongoose.connection.once('open' , function(){

	console.log("Databse connection open success")

});

mongoose.set('debug', true);


var imageRouter = require('./app/controllers/imageRouter');
app.use('/' , imageRouter);


app.listen(5000, function () {
    console.log('Express server listening on port ' +5000);
});
