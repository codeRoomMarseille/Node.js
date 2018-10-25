// Librairie onoff
let Gpio = require('onoff').Gpio;
// GPIO 22 en sortie
let LED = new Gpio(22, 'out'); 
// Allume la LED
LED.writeSync(1); 

