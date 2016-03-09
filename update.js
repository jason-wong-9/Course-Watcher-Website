var User = require('./server/models/user');
var Request = require('./server/models/request');
var urlRequest = require('request');

var runEveryFiveMinute = function() {
	var minutes = 0.1, the_interval = minutes * 60 * 1000;
	setInterval(function() {
	  	console.log("I am doing my 5 minutes check");
	  	// do your stuff here
	  	
		urlRequest.get('http://www.google.com', function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        //console.log(body);
		    }
		});
	  	Request.find({ isChecked: false }, function(err, requests){
	        if (err) {
	   	        //res.send(err);
	   	        console.log(err);
	            return;
	        } else {
	  			console.log(requests);
	  			requests.forEach(function (request){
					var sessionYear = request.sessionYear;
					var sumWin = request.sumWin;
					var department = request.department;
					var courseNumber = request.courseNumber;
					var courseSession = request.courseSession;
					var isRestricted = request.isRestricted;
					var url = "https://courses.students.ubc.ca/cs/main?sessyr=" + sessionYear
                          + "&sesscd=" + sumWin.substring(0, 1)
                          + "&pname=subjarea&tname=subjareas&req=5&dept=" + department
                          + "&course=" + courseNumber + "&section=" + courseSession;
                    
                    
	            	//request.isChecked = true;
	            	request.save();
	            });
	        }
        });
	}, the_interval);
};

module.exports.run = runEveryFiveMinute;

