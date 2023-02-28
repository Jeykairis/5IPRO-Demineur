
/* Code du démineur*/

// fonction lors du click sur le bouton NON
function NON() {
	var bouttonOui = document.getElementById("clickOui");
	bouttonOui.remove();
	var bouttonNon = document.getElementById("clickNON");
	bouttonNon.remove();
	alert("Merci, aurevoir.");
	location.reload();
  }

// fonction qui va lancer le jeu lors du click OUI
function OUI() {
	var bouttonNon = document.getElementById("clickNON");
	bouttonNon.remove();
	var bouttonOui = document.getElementById("clickOui");
	bouttonOui.remove();
	alert("Amusez-vous bien.");
  
	initialiserGrille(); //appel la fct pour placer les bombes "#")
	chiffreGrille(); //appel la fonction pour placer les chiffres
	montreCase(); // retire les cases lors du click
	//endGame();
	/* flag(); //appel la fonction pour placer le drapeau (actuellement pas encore crée)*/
  }

//fonction qui rempli la grille  avec les bombes (#)
function initialiserGrille() {
	// Initialisation de la grille avec des zéros
	var grille = [[], [], [], [], [], [], [], [], [], []];
  
	// Remplissage aléatoire d'une case par ligne
	for (var i = 0; i < grille.length; i++) {
	  var randomCol = Math.floor(Math.random() * grille.length);
	  grille[i][randomCol] = 1;
	}
  
	// Récupération du tableau HTML et modification des cases
	var grilleHtml = document.getElementById("grille");
	for (var i = 0; i < grille.length; i++) {
	  for (var j = 0; j < grille.length; j++) {
		if (grille[i][j] === 1) {
		  grilleHtml.rows[i].cells[j].innerHTML = "#";
		}
	  }
	}
  }


  //fonction qui rempli la grille avec les chiffres(C)
function chiffreGrille() {
	// Initialisation de la grille avec des zéros
	var grille = [[], [], [], [], [], [], [], [], [], []];
  
	// Remplissage aléatoire d'une case par ligne
	for (var i = 0; i < grille.length; i++) {
	  var randomCol = Math.floor(Math.random() * grille.length);
	  grille[i][randomCol] = 1;
	}
  
	// Récupération du tableau HTML et modification des cases
	var grilleHtml = document.getElementById("grille");
	for (var i = 0; i < grille.length; i++) {
	  for (var j = 0; j < grille.length; j++) {
		if (grille[i][j] === 1) {
		  grilleHtml.rows[i].cells[j].innerHTML = "C";
		}
	  }
	}
  }


  // function pour découvrir les cases au click
 
function montreCase(){
	var cases = document.getElementsByClassName("boom");
     var grille;   
	// Ajout de l'écouteur d'événement "click" sur chaque case
	for (var i = 0; i < cases.length; i++) {
	  cases[i].addEventListener("click", function() {
		// Retire la case cliquée de la grille
		//this.parentNode.removeChild(this);
	  });
	}
}

/*
function endGame(){

}*/

  











  //fonction pour placer le drapeau

 /* function flag(){}*/