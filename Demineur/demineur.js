
/* Code du démineur*/





// A)fait disparaitre les deux boutons lors du click non


function NON() {
	var bouttonOui = document.getElementById("clickOui");
	bouttonOui.remove();
	var bouttonNon = document.getElementById("clickNON");
	bouttonNon.remove();
	alert("Merci, aurevoir.");

	

	location.reload();



}







// B) lors du click au "Oui" , place les pions et fait disparaitre les boutons
function OUI() {
	//fait disparaitre le buton non
	var bouttonNon = document.getElementById("clickNON");
	bouttonNon.remove();
	
	// fait disparaitre le button oui et lance la partie
	var bouttonOui = document.getElementById("clickOui");
	bouttonOui.remove();
	alert("Amusez-vous bien.");

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




