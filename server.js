var express    = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config')
var mongoose   = require('mongoose');
    // Course     = require("./models/course")
var app = express();

mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});


app.set('views', __dirname + '/server/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// var courseSchema = new mongoose.Schema({
//    sessionYear: String,
//    sumWin: String,
//    department: String,
//    courseNumber: String,
//    courseSession: String,
//    restricted: Boolean,
//    isChecked: Boolean
// });
// var userSchema = new mongoose.Schema({
//     name: String,
//     email: String
// })
// var Course = mongoose.model("Course", courseSchema);

// var minutes = 0.1, the_interval = minutes * 60 * 1000;
// setInterval(function() {
//   console.log("I am doing my 5 minutes check");
//   // do your stuff here
// }, the_interval);
// app.post("/courses", function(req, res){
    
// });

var api = require('./server/routes/api')(app, express);
app.use('/api', api);

app.get('*', function(req, res){
   res.sendFile(__dirname + '/public/app/views/index.html'); 
});

var port = 8080;
if (!config.dev){
  port = process.env.PORT; 
}

app.listen(port, function(err){
  if (err) {
    console.log(error);
  } else {
    console.log("Server Running on " + port); 
  }
   
});
