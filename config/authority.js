var express = require('express')
var RegRouter = express.Router();
var User = require('../models/user');

var bodyparser = require('body-parser');
var authcontrol = require('../config/Verify_JWT');

var config_jwt = {
  'secret': 'supersecret',
  'token_expire_time': 123600
}

RegRouter.use(bodyparser.json());
RegRouter.use(bodyparser.urlencoded({extended : false}));

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

RegRouter.post('/register',(req,res) => {


			var username = req.body.username;
			var password = req.body.password;

			var hashedPassword = bcrypt.hashSync(password, 8);

			User.create({

				name : username,
				password : hashedPassword
			}).then(c => console.log(c)).catch(err => console.log(err));

})


RegRouter.post('/login', (req,res) => {

		var Username = req.body.username;
		var password = req.body.password;
		var pass = password.toString();

	
		User.find({name : 'sangeetha'}).then(c => {

			var PassCompare = bcrypt.compareSync(pass,c[0].password);

			if(!PassCompare) return res.status(401).json({auth : false,token : null});


			var token = jwt.sign({name : c.name},config_jwt.secret,{
				expiresIn : config_jwt.token_expire_time
			})

			res.status(200).json({auth : true,token : token});
		}).catch(err => console.log(err))
})

RegRouter.get('/Success',authcontrol,(req,res) => {


		var username = req.name;
		User.findOne({username}).then(c => {

				res.status(200).json("This is checked successfully BALA");
		}).catch(err => {

				res.status(401).json({auth : false , message : "Invalid token or Invalid Authroization"});
		})

})

module.exports = RegRouter;