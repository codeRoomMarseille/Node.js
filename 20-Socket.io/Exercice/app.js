var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Librairie onoff
let Gpio = require('onoff').Gpio;
// Le bouton avec une interruption sur les deux fronts
let pushButton = new Gpio(17, 'in', 'both');

server.listen(8000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.emit('serveur', 'Hello world du serveur');

	socket.on('navigateur', function (nav) {
		console.log(nav);
	});
  
	// Fonction execute lors d'une interruption avec fonction de callback de gestion d'erreur
	pushButton.watch(function (err, value) {
		if (err) { // Si erreur
			console.error("Y'a un bleme: ", err); 
			return;
		}
		socket.emit('switch', 'Hello world du switch');
	});
});

// Fonction execute lors d'un arret du programme par CTRL-C
function unexportOnClose() { 
	// Desactive le switch
	pushButton.unexport(); 
	
	console.log("FIN");
	process.exit();
};

// Indique la fonction a lancer apres un CTRL-C
process.on('SIGINT', unexportOnClose);
