var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    // Course     = require("./models/course")
    
//mongoose.connect("mongodb://localhost/coursedetails");
app.set("view engine", "ejs");
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: true}));

var courseSchema = new mongoose.Schema({
   sessionYear: String,
   sumWin: String,
   department: String,
   courseNumber: String,
   courseSession: String,
   restricted: Boolean,
   isChecked: Boolean
});
var userSchema = new mongoose.Schema({
    name: String,
    email: String
})
var Course = mongoose.model("Course", courseSchema);

var minutes = 0.1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 5 minutes check");
  // do your stuff here
}, the_interval);
app.post("/courses", function(req, res){
    
});

app.get("/", function(req, res){
   res.render("index"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Running"); 
});
