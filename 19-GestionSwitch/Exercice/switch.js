"use strict"

let chalk = require('chalk');

// Librairie onoff
let Gpio = require('onoff').Gpio;
// La LED
let LED = new Gpio(22, 'out'); 
// Le bouton avec une interruption sur les deux fronts
let pushButton = new Gpio(17, 'in', 'both');
// Compteur d'appui
let compteur = 0;

// Fonction execute lors d'une interruption avec fonction de callback de gestion d'erreur
pushButton.watch(function (err, value) {
	if (err) { // Si erreur
		console.error(chalk.blue.bgRed.bold("Y'a un bleme: "), err); 
		return;
	}
	// La LED suit le bouton
	LED.writeSync(value); 
	console.log(chalk.yellow("Valeur bouton: " + value + " nombre: " + compteur));
	compteur++;
});

// Fonction execute lors d'un arret du programme par CTRL-C
function unexportOnClose() { 
	// Eteint la LED
	LED.writeSync(0); 
	// Desactive la LED
	LED.unexport(); 
	// Desactive le switch
	pushButton.unexport(); 
	
	console.log(chalk.blue.bgRed.bold("FIN"));
	process.exit();
};

// Indique la fonction a lancer apres un CTRL-C
process.on('SIGINT', unexportOnClose); 
