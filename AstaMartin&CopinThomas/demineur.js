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
    fixeIndexesY(grid);
    console.log(grid);
}

/**Permet de créer une liste de positions aléatoires où placer des mines.
 * 
 * @param {*} numberOfBombs indique le nombre de bombes que l'on souhaite mettre dans la grille
 * @returns une liste de position où on ajoutera des bombes
 */
function setBombs(numberOfBombs) {
    let posOfBombs = [];
    for (let i = 0; i < numberOfBombs; i++) {
        posOfBombs.push([]);
        posOfBombs[i].push(Math.floor(Math.random() * (numberOfBombs - 0)) + 0);
        posOfBombs[i].push(Math.floor(Math.random() * (numberOfBombs - 0)) + 0);
    }
    return posOfBombs;
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

function fixeIndexesY(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] != "X") {
                if (j != 0) {
                    if (grid[j - 1][i] == "X") {
                        grid[j][i] += 1;
                    }
                }
                if (j != grid.length - 1) {
                    if (grid[j + 1][i] == "X") {
                        grid[j][i] += 1;
                    }
                }
            }
        }
    }
}

main();