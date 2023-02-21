
/* Code du démineur*/




/* function A pour récuper la valeur du user et travailler dessus ensuite*/
function getValue() {
	// Récupérer la nbUser de l'entrée utilisateur
	var nbUser = document.getElementById("input").value;

	if(nbUser<1 || nbUser> 11){
		alert("Veuillez encoder le nombre demandé.");
	}else{// Appeler les fonctions de traitement

	var resultat1 = afficheButton(nbUser); //function1
	var resultat2 = remplirTableau(); //function2
	  }
  }

/* function1: pour affichage au bouton du nb de bombes demandé*/
function afficheButton() {
	  // Sélectionner l'élément input et récupérer sa valeur
	  var input = document.getElementById("input").value;
	  document.getElementById("button2").innerHTML = input;
  }
/*function pour remplir le tableau*/
function remplirTableau() {
  var entree = document.getElementById("input").value;
  var table = document.getElementById("grille");
  var cellules = table.getElementsByTagName("td");
    for (var i = 0; i < cellules.length; i++) {        
      cellules[i].innerHTML = entree
      var entree = "*";
          }
}
    