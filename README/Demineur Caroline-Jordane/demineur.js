// fonction lors du click sur le bouton NON
function NON() {
	var bouttonOui = document.getElementById("clickOui");
bouttonOui.classList.remove("hidden");
var bouttonNon = document.getElementById("clickNON");
bouttonNon.classList.add("hidden"); // ici
var cases = document.getElementsByClassName("boom");
for (var i = 0; i < cases.length; i++) {
    cases[i].classList.remove("hidden");
}
alert("Merci, aurevoir.");
location.reload();
}

// fonction qui va lancer le jeu lors du click OUI
function OUI() {
	var bouttonNon = document.getElementById("clickNON");
bouttonNon.classList.remove("hidden");
var bouttonOui = document.getElementById("clickOui");
bouttonOui.classList.remove("hidden");
	alert("Amusez-vous bien.");
  
	cacherCase();
	initialiserGrille(); //appel la fct pour placer les bombes "#")
	chiffreGrille(); //appel la fonction pour placer les chiffres
	retireCase(); // retire les cases lors du click
	endGame();
	flag(); //appel la fonction pour placer le drapeau (actuellement pas encore crée)
}

function cacherCase() {
	var cases = document.getElementsByClassName("boom");
	for (var i = 0; i < cases.length; i++) {
		cases[i].classList.add("caché");
	}
}

// function pour découvrir les cases au click
function retireCase(){
	var cases = document.getElementsByClassName("boom");
	var grille = document.getElementById("grille");
	// Ajout de l'écouteur d'événement "click" sur chaque case
	for (var i = 0; i < cases.length; i++) {
		cases[i].addEventListener("click", function() {
			// Affiche le contenu de la case cliquée
			this.children[0].classList.remove("hidden");
			// Retire la classe "caché" pour révéler la case
			this.classList.remove("caché");
			// Retire la case cliquée de la grille
			this.parentNode.removeChild(this);
		});
	}
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
		  break; // on sort de la boucle dès qu'un "#" a été ajouté
		}
	  }
	}
}




//fonction qui rempli la grille avec les chiffres
function chiffreGrille() {
	// Initialisation de la grille avec des zéros
	var grille = [[], [], [], [], [], [], [], [], [], []];
  
	// Remplissage aléatoire d'une case par ligne
	for (var i = 0; i < grille.length; i++) {
	  var randomCol = Math.floor(Math.random() * grille.length);
	  grille[i][randomCol] = 1;
	}
  
	// Comptage du nombre de bombes pour chaque case de la grille
	for (var i = 0; i < grille.length; i++) {
	  for (var j = 0; j < grille.length; j++) {
		if (grille[i][j] !== 1) { // Ne pas compter les cases qui contiennent une bombe
		  var count = 0;
		  if (i > 0 && grille[i-1][j] === 1) count++; // Vérifier la case au-dessus
		  if (i < grille.length-1 && grille[i+1][j] === 1) count++; // Vérifier la case en-dessous
		  if (j > 0 && grille[i][j-1] === 1) count++; // Vérifier la case à gauche
		  if (j < grille.length-1 && grille[i][j+1] === 1) count++; // Vérifier la case à droite
		  if (i > 0 && j > 0 && grille[i-1][j-1] === 1) count++; // Vérifier la case en haut à gauche
		  if (i > 0 && j < grille.length-1 && grille[i-1][j+1] === 1) count++; // Vérifier la case en haut à droite
		  if (i < grille.length-1 && j > 0 && grille[i+1][j-1] === 1) count++; // Vérifier la case en bas à gauche
		  if (i < grille.length-1 && j < grille.length-1 && grille[i+1][j+1] === 1) count++; // Vérifier la case en bas à droite
		  grille[i][j] = count; // Stocker le nombre de bombes dans la case de la grille
		}
	  }
	}
  
	// Récupération du tableau HTML et modification des cases
	var grilleHtml = document.getElementById("grille");
	for (var i = 0; i < grille.length; i++) {
	  for (var j = 0; j < grille.length; j++) {
		if (grille[i][j] === 1) {
		  grilleHtml.rows[i].cells[j].innerHTML = "#";
		} else {
		  grilleHtml.rows[i].cells[j].innerHTML = grille[i][j];
		}
	  }
	}
}




//function pour placer les drapeaux

function flag() {
    var cases = document.getElementsByTagName("td");
    for (var i = 0; i < cases.length; i++) {
        cases[i].addEventListener("contextmenu", function(e) {
            e.preventDefault(); // Empêche l'affichage du menu contextuel
            if (this.innerHTML === "") {
                this.innerHTML = "🚩";
            } else if (this.innerHTML === "🚩") {
                this.innerHTML = "";
            }
        });
    }
}



// Fonction pour afficher toutes les cases en fin de partie
function endGame() {
	var cases = document.getElementsByClassName("boom");
	// Affichage des cases restantes
	for (var i = 0; i < cases.length; i++) {
	if (!cases[i].classList.contains("drapeau")) {
	cases[i].classList.add("decouverte");
	}
	}
	}
	

