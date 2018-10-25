// Librairie express
let express = require('express');

// Application
let app = express();

// Reponse aux clients
let reponse = 
'<!DOCTYPE html>\n' +
'<html>\n' +
'   <head>\n' +
'       <!-- En-tête de la page -->\n' +
'       <meta charset="utf-8" />\n' +
'       <title>Hello World</title>\n' +
'   </head>\n' +
'   <body>\n' +
'       <!-- Corps de la page -->\n' +
'		<p id="dynamique"></p>\n' +
'		<script type="text/javascript">document.getElementById("dynamique").innerHTML = "Hello World";</script>\n' +
'   </body>\n' +
'</html>\n';
 
 // Ecoute la racine du serveur (et que la racine)
app.get('/', function (req, res) {
	// Reponse aux clients
	res.send(reponse);
});
 
// Ecoute les requetes sur le port 3000 et l'adresse IP de la machine sur laquelle s'execute le script
app.listen(3000);
