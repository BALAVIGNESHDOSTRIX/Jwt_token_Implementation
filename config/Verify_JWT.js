var jwt = require('jsonwebtoken');

var config_jwt = {
  'secret': 'supersecret',
  'token_expire_time': 123600
}

 var JWTVerify = (req,res,next) => {

		var token = req.headers['x-access-token'];

		if(!token){

			res.status(403).json({ auth: false, message: 'No token provided.' });
		}else{

			jwt.verify(token,config_jwt.secret,function(err,decoded){

					if(err){

						res.status(403).json({auth :false, message:"The authentication failure !.."});
					}else{

						req.user_name = decoded.name;

						next();
					}
			})
		}
}


module.exports = JWTVerify;

