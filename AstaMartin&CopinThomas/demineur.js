/**Fonction principale qui s'occupe de set up la grille et du bon déroulement de la partie.
 * 
 */
function main(){
    let sizeOfGrid = parseInt(prompt("Quelle sera la hauteur de votre grille ? (la grille sera carrée)"));
    createGrid(sizeOfGrid);
}

/**Permet de créer une liste de positions aléatoires où placer des mines.
 * 
 * @param {*} numberOfBombs indique le nombre de bombes que l'on souhaite mettre dans la grille
 * @returns une liste de position où on ajoutera des bombes
 */
function setBombs(numberOfBombs){
    let posOfBombs = [];
    for(let i = 0; i < numberOfBombs; i++){
        posOfBombs.push([]);
        posOfBombs[i].push(Math.floor(Math.random() * (5 - 0)) + 0);
        posOfBombs[i].push(Math.floor(Math.random() * (5 - 0)) + 0);
    }
    return posOfBombs;
}
