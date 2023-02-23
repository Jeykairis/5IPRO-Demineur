
/* Code du démineur*/

// le joueur click sur "NON" pour ne pas démarrer le jeu
function NON() {
	document.getElementById("clickNON").innerHTML = "Aurevoir";
	//retire le boutton "NON"

	const monBouton = document.getElementById("monBouton");
  monBouton.addEventListener("click", () => {
    monBouton.remove();
  });

	
}


// le jouer click sur "Oui" pour lancer démarrer le jeu
function OUI() {
	document.getElementById("clickOui").innerHTML = "Bon amusement";

	 // Initialisation de la grille avec des zéros
	 var grille = [
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	  ];
  
	  // Remplissage aléatoire d'une case par ligne
	  for (var i = 0; i < grille.length; i++) {
		var randomCol = Math.floor(Math.random() * grille.length);
		grille[i][randomCol] = 1;
	  }
  
	  // Récupération du tableau HTML et modification des cases
	  var grilleHtml = document.getElementById('grille');
	  for (var i = 0; i < grille.length; i++) {
		for (var j = 0; j < grille.length; j++) {
		  if (grille[i][j] === 1) {
			grilleHtml.rows[i].cells[j].innerHTML = 'X';
		  }
		}
	  }


}




