var User = require('./server/models/user');
var Request = require('./server/models/request');
var runEveryFiveMinute = function() {
	var minutes = 0.1, the_interval = minutes * 60 * 1000;
	setInterval(function() {
	  	console.log("I am doing my 5 minutes check");
	  	// do your stuff here
	  	
	  	Request.find({ isChecked: false }, function(err, requests){
	        if (err) {
	   	        res.send(err);
	            return;
	        } else {
	  			console.log(requests);
	  			requests.forEach(function (request){

	            	request.isChecked = true;
	            	request.save();
	            });
	        }
        });
	}, the_interval);
};

module.exports.run = runEveryFiveMinute;

