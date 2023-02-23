
/* Code du démineur*/




/* function A pour récuper la valeur du user et travailler dessus ensuite*/

  function getValue() {
	// Récupérer la nbUser de l'entrée utilisateur
	var repUser = document.getElementById("input").value;

	
	if(repUser !=="oui" ){
		alert("Merci, aurevoir.");
	}else{// Appeler les fonctions de traitement

	var resultat1 = afficheButton(repUser); //function1
	var resultat2 = bombeTableau(); //function2
	  }
  }

/* function1: Affiche le bouton qui va lancer le jeu et placer ensuite la bombe aléatoirement*/
function afficheButton() {
	  // Sélectionner l'élément input et récupérer sa valeur
	  var input = document.getElementById("input").value;
	  document.getElementById("button2").innerHTML = "Bon amusement";
  }


/*function2: pour mettre 1 seule bombe aléatoirement dans le tableau*/
function bombeTableau() {
	var bombe = "*";
	var input = document.getElementById('input').value;
  var button = document.getElementById("boom");
	var table = document.getElementById('grille');

	// Choix aléatoire d'une ligne et d'une colonne
  button.addEventListener("click", function() {
  button.innerText = input.value;
  });
	var randomRow = Math.floor(Math.random() * 10);
	var randomCol = Math.floor(Math.random() * 10);

	// Mise à jour de la cellule avec l'entrée utilisateur
	var input = bombe;
	table.rows[randomRow].cells[randomCol].innerHTML = input;
}        