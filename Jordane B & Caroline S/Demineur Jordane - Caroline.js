
/* Code du démineur*/


/*A) récupère le nb de bombe et l'affiche puis prépa fct pour injecte dans tableau*/

// function pour récuper la valeur du user
function traiter() {
	// Récupérer la nbUser de l'entrée utilisateur
	var nbUser = document.getElementById("input").value;

	// Appeler les fonctions de traitement
	var resultat1 = afficheNb(nbUser);
	var resultat2 = injecteTableau(nbUser);

	// Afficher les résultats
	alert("Résultat 1 : " + resultat1 + "\nRésultat 2 : " + resultat2);
  }

//function pour affichage au bouton du nb de bombes
function afficheNb() {
	// Sélectionner l'élément input et récupérer sa valeur
	var input = document.getElementById("input").value;
	document.getElementById("button2").innerHTML = input;
	// Traitement de la nbUser
	  //return "Résultat de la fonction 1 avec " + nbUser;
	return "Résultat de la fonction 1 avec " + input;
}


//préparation de function pour encoder les bombes
function injecteTableau(nbUser) {
	// Traitement de la nbUser
	nbUser=10;
	for(var i=0; i <100; i++){
	nbUser++;
}
	return "Résultat après incrémentation: " + nbUser;
}

     

                    
/*                    
//B) injecter la nbUser dans le tableau de boutons

var grille =[];

function ajouterBombes(){
	var nbUser = document.getElementById("in").value; //récupération de l'entrée du user
	grille.push(nbUser); //ajoute la nbUser au tableau

	for(var i=0; i <= grille.length; i++){
		var caseTableau = document.getElementById(i+1); //récupère la cellule
		caseTableau.innerText = grille[i]; // ajoute la nbUser à la cellule

	}
}
*/