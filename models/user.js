var mongoose = require('mongoose');

var Schema= mongoose.Schema;



var UserSchema = new Schema({


			name : {

				type : String,
				unique : true,
				required : true
			},
			password : {

				type : String,
				required : true
			}

},{
	timestamps : true
})

var UserSchema = mongoose.model('User',UserSchema);

module.exports = UserSchema;