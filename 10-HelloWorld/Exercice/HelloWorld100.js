// Mesure le temps d'exécution de l'affichage 100 fois de Hello World
console.time('100-helloWorld');
for (let compteur = 0; compteur < 100; compteur++) {
	console.log("Hello World numéro: " + compteur);
}
console.timeEnd('100-helloWorld');
