var User = require('../models/user');
var Story = require('../models/request');
var config = require('../../config');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function generateToken (user) {
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		email: user.email,
		username: user.username
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express) {
	var api = express.Router();

	api.post('/signup', function(req, res){
		var user = new User({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});
		var token = generateToken(user);
		user.save(function(err){
			if(err){
				res.send(err);
				return;
			} else {
				res.json({
					success: true,
					message: 'User has been created!',
					token: token
				});
			}
		});
	});

	api.post("/login", function(req, res){
        User.findOne({ 
            username: req.body.username
        }).select('name email username password').exec(function(err, user) {
            if(err) throw err;
          
            if(!user) {
      	     	res.send({ message: "User doesn't exist!" });
      	  	} else {
            	var validPassword = user.comparePassword(req.body.password);
              
            	if(!validPassword){
            		res.send({ message: "Invalid Password" })
            	} else {
                  // Create Token
                	var token = generateToken(user);
                  
                	res.json({
                  		success: true,
                    	message: "Successfully login!",
                    	token: token
                	});
             	}
          	}
            
       	});
    });
    api.use(function(req, res, next){
        console.log("Checking for token");
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        
        // check if token exist
        if(token) {
            jsonwebtoken.verify(token, secretKey, function(err, decoded){
               if(err) {
                   res.status(403).send({ success: false, message: "Failed to authenticate!"});
               } else {
                   req.decoded = decoded;
                   next();
               }
            });
        } else {
            res.status(403).send({ success: false, message: "No Token Provided" });
        }
    });

    // Would only work if we have token

    return api;
}