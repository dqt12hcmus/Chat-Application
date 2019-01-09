const express = require('express')
const path = require('path')
const app = express()
const APP_PORT = process.env.PORT || 5555

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'));
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
                io.emit('chatter', object);
	});
});
