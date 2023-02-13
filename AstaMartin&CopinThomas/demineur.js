/**Fonction principale qui s'occupe de set up la grille et du bon déroulement de la partie.
 * 
 */
function main() {
    let sizeOfGrid = parseInt(prompt("Quelle sera la hauteur de votre grille ? (la grille sera carrée)"));
    let grid = createGrid(sizeOfGrid);
    let bombs = setBombs(sizeOfGrid);
    for (let i = 0; i < bombs.length; i++) {
        grid[bombs[i][0]][bombs[i][1]] = "X";
    }
    fixeIndexes(grid, bombs);
    console.log(grid);
}

/**Permet de créer une liste de positions aléatoires où placer des mines.
 * 
 * @param {*} numberOfBombs indique le nombre de bombes que l'on souhaite mettre dans la grille
 * @returns une liste de position où on ajoutera des bombes
 */
function setBombs(numberOfBombs) {
    let posOfBombs = [];
    let i = 0;
    while(posOfBombs.length < numberOfBombs){
        let newPos = [Math.floor(Math.random() * (numberOfBombs - 0)) + 0, Math.floor(Math.random() * (numberOfBombs - 0)) + 0];
        if(!includesPair(posOfBombs,newPos)){
            posOfBombs.push(newPos);
            i++;
        }
    }
    return posOfBombs;
}

/**S'assure qu'aucun doublon n'est présent dans la liste des positions où placer les bombes
 * 
 * @param {*} posOfBombs indique la liste des positions des bombes
 * @param {*} pair indique la position à check dans la liste
 * @returns true si la paire est déjà dans la liste, false sinon
 */
function includesPair(posOfBombs, pair){
    for(let i = 0; i < posOfBombs.length; i++){
        if(pair[0] == posOfBombs[i][0] && pair[1] == posOfBombs[i][1]){
            return true;
        }
    }
    return false;
}

/** Cette fonction sert à créer une grille de jeu pour le demineur d'une dimension demandée à l'utilisateur.
 * 
 * @param {*} a est la hauteur et la longueur de la grille
 * @returns une grille de dimension a
 */
function createGrid(a) {
    let grid = [];
    for (let j = 0; j < a; j++) {
        grid.push([]);
        for (let i = 0; i < a; i++) {
            grid[j].push(0);
        }
    }
    return grid;
}

/**S'occupe de mettre les indices partout sur la grille
 * 
 * @param {*} grid indique la grille sur laquelle on pose les indices
 * @param {*} bombs indique la liste de positions des bombes
 */
function fixeIndexes(grid, bombs) {
    for (let i = 0; i < bombs.length; i++){ //On a la liste des positions des bombes, du coup on s'occupe d'incrémenter les indices autour de chaque bombe
        if (bombs[i][1] > 0 && grid[bombs[i][0]][bombs[i][1]-1] != "X"){ //Les 8 positions autour du coup oui
            grid[bombs[i][0]][bombs[i][1]-1] += 1;
        }
        if (bombs[i][1] > 0 && bombs[i][0] < grid.length-1 && grid[bombs[i][0]+1][bombs[i][1]-1] != "X"){
            grid[bombs[i][0]+1][bombs[i][1]-1] += 1;
        }
        if (bombs[i][0] < grid.length-1 && grid[bombs[i][0]+1][bombs[i][1]] != "X"){
            grid[bombs[i][0]+1][bombs[i][1]] += 1;
        }
        if (bombs[i][0] < grid.length-1  && bombs[i][1] < grid.length-1 && grid[bombs[i][0]+1][bombs[i][1]+1] != "X"){
            grid[bombs[i][0]+1][bombs[i][1]+1] += 1;
        }  
        if (bombs[i][1] < grid.length-1 && grid[bombs[i][0]][bombs[i][1]+1] != "X"){
            grid[bombs[i][0]][bombs[i][1]+1] += 1;
        }  
        if (bombs[i][0] > 0 && bombs[i][1] < grid.length-1 && grid[bombs[i][0]-1][bombs[i][1]+1] != "X"){
            grid[bombs[i][0]-1][bombs[i][1]+1] += 1;
        }      
        if (bombs[i][0] > 0 && grid[bombs[i][0]-1][bombs[i][1]] != "X"){
            grid[bombs[i][0]-1][bombs[i][1]] += 1;
        }  
        if (bombs[i][0] > 0 && bombs[i][1] > 0 && grid[bombs[i][0]-1][bombs[i][1]-1] != "X"){
            grid[bombs[i][0]-1][bombs[i][1]-1] += 1;
        }        
    }
}

main();