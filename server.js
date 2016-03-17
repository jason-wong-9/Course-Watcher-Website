var express    = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config')
var mongoose   = require('mongoose');
var update = require('./update');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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


var api = require('./server/routes/api')(app, express, io);
app.use('/api', api);

app.get('*', function(req, res){
   res.sendFile(__dirname + '/public/app/views/index.html'); 
});

update.run(io);

var port = 8080;
if (!config.dev){
  port = process.env.PORT; 
}

http.listen(port, function(err){
  if (err) {
    console.log(error);
  } else {
    console.log("Server Running on " + port); 
  }
   
});
