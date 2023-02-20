
/* Code du démineur*/


var i= 0; // boucle
var min = 0 ; //permet de calculer %
var max = 10 ; //permet de calculer %
var game;
var random; // permet de mettre la fonction aléatoire




console.log("hello world");


var game = prompt("Voulez-vous jouer au Démineur?"); 									// le user souhaite jouer? OUI/NON

	if(game === "oui"){ 																	//Si oui
		do {																				// bloc qui exécute les tâches tant que le joueur indique qu'il veut jouer
			var choice = prompt("Choisissez le nombre de bombes souhaitées: entre 1 et 10.");  // le user doit choisir le nbre de bombes (max 10)
			if( choice > 0 || choice < 11 ){
			
                // ici Créer une fonction qui va mettre aléatoirement le nb de nombre dans le tableau 

				}
				else{
					
					console.log(choice + " Veuillez encoder un nombre comme demandé svp.") 				// dans le cas de nombre incorrect
				
				}

			var game = prompt("Voulez-vous rejouer?"); 										//permet de rejouer 
			
			}
			

		}
		while(game == "oui"); 																// les tâches sont exécutées tant que le user veut jouer
		
		console.log("Merci d'avoir joué. Votre taux de réussite est de: " + (resultWin/i)*100 + "%."); 
	

	else{
		alert("Merci pour votre réponse. A bientôt"); // le user ne souhaite pas jouer dès la première question
	}

	