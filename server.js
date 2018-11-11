var express = require('express')
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');



var RegRouter = require('./config/authority');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}))
app.use('/User',RegRouter);


mongoose.connect('mongodb://localhost:27017/Dharani').then(c => {

		console.log('Mongodb connected successfully')
}).catch(err => {

		console.log('Mongodb not connected' + err);
})

app.listen(1997,(err) => {

	if(err){console.log(err)}

		console.log('The server running at the port : 1997')
})


