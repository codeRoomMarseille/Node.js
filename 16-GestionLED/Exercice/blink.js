// Librairie onoff
let Gpio = require('onoff').Gpio;
// GPIO 22 en sortie
let LED = new Gpio(22, 'out'); 

// Fonction qui gere le clignotement
function blinkLED() {
	// Si l'état de la sortie est à 0 (LED éteinte) on l'allume
	// Fonction de lecture synchrone
	if(LED.readSync() === 0) {
		LED.writeSync(1); 
		console.log("Allume");
	} else {
	// Si l'état de la sortie est à 1 (LED allume) on l'eteint
		LED.writeSync(0); 
		console.log("Eteint");
	}
}

// Fin de clignotement
function endBlink() { 
	// Arrete le timer blinkInterval
	clearInterval(blinkInterval);
	// Eteint la LED
	LED.writeSync(0); 
	// Desactive le GPIO22 pour eviter tout risque de court circuit
	LED.unexport(); 
	console.log("Arrete");
}

console.log("Debut du programme");

// Lance la fonction blinkLED toutes les 380ms
let blinkInterval = setInterval(blinkLED, 380); 
// Lance endBlink au bout de 12300ms
setTimeout(endBlink, 12300);

console.log("Fin du programme");
