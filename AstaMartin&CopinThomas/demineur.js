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