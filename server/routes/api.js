var User = require('../models/user');
var Request = require('../models/request');
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

    api.route('/')
        .post(function(req, res){
          var request = new Request({
            creator: req.decoded.id,
            sessionYear: req.body.sessionYear,
            sumWin: req.body.sumWin,
            department: req.body.department,
            courseNumber: req.body.courseNumber,
            courseSession: req.body.courseSession,
            isRestricted: req.body.isRestricted
          });
            request.save(function(err){
              if (err) {
                res.send(err);
                return;
              } else {
                res.json({
                  success: true,
                  message: "New Request Created"
                });
              }
            })
          })

          .get(function(req, res){
            Request.find({ creator: req.decoded.id }, function(err, requests){
              if (err) {
                res.send(err);
                return;
              } else {
                res.json(requests);
              }
            });
          });
          
    api.get('/me', function(req, res) {
        res.json(req.decoded);
    });


    api.route('/requests/:request_id')
          .delete(function(req, res){
            
            Request.remove({
              _id: req.params.request_id
            }, function(err, request){
              if (err){
                res.send(err);
              } else {
                res.json({ 
                  success: true,
                  message: "Request deleted"
                });
              }

            });
          });



    return api;
}