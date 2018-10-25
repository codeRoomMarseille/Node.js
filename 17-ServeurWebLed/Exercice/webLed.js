"use strict"

// Chargement des modules
let express = require('express');
// Librairie onoff
let Gpio = require('onoff').Gpio;

// GPIO 22 en sortie
let LED = new Gpio(22, 'out'); 

// Initialisation du module Express
let app = express();

// Variable gerant le clignotement
let blinkInterval;

// Fonction execute lors d'un arret du programme par CTRL-C
function unexportOnClose() { 
	// Eteint la LED
	LED.writeSync(0); 
	// Desactive la LED
	LED.unexport(); 
	
	console.log("FIN du programme");
	process.exit();
};

// Fonction qui gere le clignotement
function blinkLED() {
	if(LED.readSync() === 0) {
		LED.writeSync(1); 
	} else {
		LED.writeSync(0); 
	}
}

// Fonction qui allume la LED
function allumeLED(res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Allume la LED');
    // Arrete le clignotement si deja lance
    clearInterval(blinkInterval);
    LED.writeSync(1); 
}

// Fonction qui eteint la LED
function eteintLED(res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Eteint la LED');
    // Arrete le clignotement si deja lance
    clearInterval(blinkInterval);
    LED.writeSync(0); 
}

// Fonction qui fait clignoter la LED
function clignLED(res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Fait clignoter la LED');
    blinkInterval = setInterval(blinkLED, 380);
}

// Fonction qui fait basculer la LED
function bascLED(res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bascule la LED');
    // Arrete le clignotement si deja lance
    clearInterval(blinkInterval);
    blinkLED();
}

// Ecoute de l'adresse /ledon
app.get('/ledon', function(req, res) {
    allumeLED(res);
	console.log('LED allumé /ledon');
});

// Ecoute de l'adresse /ledoff
app.get('/ledoff', function(req, res) {
    eteintLED(res);
	console.log('LED éteinte /ledoff');
});

// Ecoute de l'adresse /ledclign
app.get('/ledclign', function(req, res) {
    clignLED(res);
	console.log('LED clignotante /ledclign');
});

// Ecoute de l'adresse /ledbasc
app.get('/ledbasc', function(req, res) {
    bascLED(res);
	console.log('LED basculé /ledbasc');
});

// Ecoute de l'adresse /led/on, /led/off /led/clign /led/basc
app.get('/led/:etat', function(req, res) {
    let etat = req.params.etat;

    switch(etat) {
        case 'on': allumeLED(res); console.log('LED allumé /led/on'); break;
        case 'off': eteintLED(res);  console.log('LED éteinte /led/off');break;
        case 'clign': clignLED(res);  console.log('LED clignotante /led/clign');break;
        case 'basc': bascLED(res);  console.log('LED basculé /led/basc');break;
        default: res.setHeader('Content-Type', 'text/plain');
                 res.end('Erreur seul /led/on, /led/off, /led/clign ou /led/basc autorisé');
				 console.log('Route incorrecte /led/xxxxxxx');
    }
});

// Ecoute de l'adresse /led avec un parametre etat de valeur on, off, clign ou basc
// ex: /led?etat=on
app.get('/led', function(req, res) {
    let etat = req.param('etat');
 
    switch(etat) {
        case 'on': allumeLED(res); console.log('LED allumé /led?etat=on'); break;
        case 'off': eteintLED(res); console.log('LED éteinte /led?etat=off'); break;
        case 'clign': clignLED(res);  console.log('LED clignotante /led?etat=clign');break;
        case 'basc': bascLED(res);  console.log('LED basculé /led?etat=basc');break;
        default: res.setHeader('Content-Type', 'text/plain');
                 res.end('Erreur seul /led?etat=on, /led?etat=off, /led?etat=clign ou /led?etat=basc autorisé');
				 console.log('Route incorrecte /led?etat=xxxxxxx');
    }
});

// Indique la fonction a lancer apres un CTRL-C
process.on('SIGINT', unexportOnClose); 

console.log('Serveur lancé: CTRL-C pour arrêter');

// Demarre le serveur web sur le port 8080
app.listen(8080);
