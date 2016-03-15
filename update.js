var User = require('./server/models/user');
var Request = require('./server/models/request');
var config = require('./config')
var urlRequest = require('request');
var nodemailer = require('nodemailer');

var runEveryFiveMinute = function() {
	var minutes = 0.1, the_interval = minutes * 60 * 1000;
	setInterval(function() {
	  	console.log("I am doing my 5 minutes check");
	  	// do your stuff here
	  	
		
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
					var courseSection = request.courseSection;
					var isRestricted = request.isRestricted;

					var url = "https://courses.students.ubc.ca/cs/main?sessyr=" + sessionYear + "&sesscd=" + sumWin.substring(0, 1) + "&pname=subjarea&tname=subjareas&req=5&dept=" + department + "&course=" + courseNumber + "&section=" + courseSection;
                    console.log(url);
                    urlRequest.get(url, function (error, response, body) {
                    	if (error){
                    		console.log(error);
                    		return;
                    	} else {
                    		if (response.statusCode == 200) {
					       		//console.log(body);


					     
                          		if (isRestricted){
                          			console.log("isRestricted");
                                    var seats_re = /Total Seats Remaining:<\/td><td align=left><strong>\d+/
                                    var seatsOut = seats_re.exec(body);

                                    var onlyNumber_re = /\d+/
                                    var onlyNumberOut = onlyNumber_re.exec(seatsOut);
                                    if (onlyNumberOut != null){
                                        var seatsRemaining = String(onlyNumberOut);
                                        console.log(seatsRemaining);
                                        if (seatsRemaining > 0){}
                                            
                                            sendEmail(request, seatsRemaining);

                                        }
                        

                          		} else {
                          			console.log("isNotRestricted");
                          		    var seats_re = /General Seats Remaining:<\/td><td align=left><strong>+\d+/
                          		    var seatsOut = seats_re.exec(body);

                          		    var onlyNumber_re = /\d+/
                          		    var onlyNumberOut = onlyNumber_re.exec(seatsOut);

                          		    if (onlyNumberOut != null){
                                        var seatsRemaining = String(onlyNumberOut);
                                        console.log(seatsRemaining);
                                        if (seatsRemaining > 0){
                                            
                                            sendEmail(request, seatsRemaining);

                                        }
                                    }
                          		}
					    	}
                    	}
					    
					});
	            	
	            });
	        }
        });
	}, the_interval);
};

var retrieveEmail = function(id){
	console.log(id);
	User.findOne({ _id: id })
		.select('name email username password').exec(function(err, user){
			if (err){
				console.log(err);
				return null;
			} else {
				return user.email;
			}
	});
};

var retrieveEmail = function(id, callback){
	console.log(id);
	User.findOne({ _id: id })
		.select('name email username password').exec(function(err, user){
			if (err){
				console.log(err);
				return;	
			}
			callback(user.email);
	});
};

var callback = function(email){
	return user.email;
}

var sendEmail = function (request, seatsRemaining){
	retrieveEmail(request.creator, function(email){
		console.log(email);
		if (email != null){
			console.log(email);
			// create reusable transporter object using the default SMTP transport 
			var transporter = nodemailer.createTransport('smtps://' + config.gmailUser + ':' + config.gmailPass + '@smtp.gmail.com');
			 
			var htmlBody = 'Your course ' + request.department + request.courseNumber + ' ' + request.courseSection + ' currently has ' + seatsRemaining + ' seats remaining.';

			console.log(htmlBody);
			// setup e-mail data with unicode symbols 
			var mailOptions = {
			    from: '"CourseWatcher Admin 👥" <' + config.gmailUser, // sender address 
			    to: email, // list of receivers 
			    subject: 'Course Notification for ' + request.department + request.courseNumber + ' ' + request.courseSection, // Subject line 
			    html: '<b>' + htmlBody + '</b>' // html body 
			};
			 
			// send mail with defined transport object 
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			    request.isChecked = true;
	            request.save();
			});
		}

	});
	
};

module.exports.run = runEveryFiveMinute;

