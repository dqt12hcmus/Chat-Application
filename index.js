const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const conString = "mongodb://admin:Abc123!@ds163044.mlab.com:63044/chat-app-dev";
const app = express()
const APP_PORT = process.env.PORT || 5555
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {
  res.render('index')
})


const server = app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`)
});

const io = require('socket.io').listen(server);

io.on('connection', function(socket){
	console.log('A user has connected');
  socket.on('chatter', function(object){
      console.log('Message: ' + object.message + ' by ' + object.name);
      var mess = new Message (object);
      mess.save((err)=>{
        if(err){
          sendStatus(500);
        }
      });
      io.emit('chatter', object);
	});
});

var Message = mongoose.model("Message", {
  name: String,
  message: String
})

mongoose.connect(conString,
                (err) =>{
                  console.log("Database connection has error:" + err);
                }
)
