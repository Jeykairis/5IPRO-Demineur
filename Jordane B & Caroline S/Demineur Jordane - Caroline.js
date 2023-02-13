

/* Parcourir les entiers de 1 à 100 et afficher l'entier sauf si celui ci ets 
un multiple de 5, afficher "Coucou" et si celui-ci est un multiple de 7 , afficher "Hibou"*/

	/* Réponse correcte 
	
	for ( var i = 1 ; i <=100; i++){
		console.log(i)
		if (i%5 == 0){
			console.log("Coucou")
		}
		if (i%7 == 0){
			console.log("Hibou")
		}

	  }*/


	  for ( var i = 1 ; i <=100; i++){
		
		if (i%5 == 0){
			console.log("Coucou");
		}
		if (i%7 == 0){
			console.log("Hibou");
		}
		if(i%7 != 0 && i %5 != 0){
			console.log(i);
		}
		
	  }
	

