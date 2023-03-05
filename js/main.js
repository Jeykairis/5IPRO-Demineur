

// 1 - creer une grille virtuelle de jeu vide avec 100 cellules
/**
 * 3x3
 * [
 * [0,0,0] // row / ligne
 * [0,0,0] // row / ligne
 * [0,0,0] // row / ligne
 * ]
 */
    /* // Boucle For

    const createVirtualGrid = () => {
        const gridSize = 10;
        const grid = [];
        for (let rowIndex = 0; rowIndex < gridSize; rowIndex++){
            const row = [];
            for (let colIndex = 0; colIndex < gridSize; colIndex++){
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    };

    */
    const createVirtualGrid = () => {
        const gridSize = 10;
        const grid = [...Array(gridSize).keys()].map(() =>{
           return[...Array(gridSize).keys()].map(() =>{
                return 0;
           });
        });
        return grid;
    };
    const grid = createVirtualGrid();

// 2 - Ajouter les 9 mines de manière aleatoires.
    //2.1 Générer 9 mines.
    //2.2 Placer de manière aleatoir.
    const addBugs = (grid) => {
        const maxBugs = 9;
    
        const bugCoords = [];
    
        while(bugCoords.length < maxBugs) {
            const coord = getRandomCoord(grid);
            if (!bugCoords.some((bugCoord) => bugCoord.col === coord.col && bugCoord.row === coord.row)) {
                bugCoords.push(coord);
            }
        }
    
        for (const coord of bugCoords){
            grid[coord.col][coord.row] = "B";
        }
    
        return bugCoords;
    };
    
    const getRandomCoord = (grid) => {
        const gridSize = grid.length;
        const col = Math.floor(Math.random() * grid.length);
        const row = Math.floor(Math.random() * grid.length);
    
        return {col, row};
    };
    
const bugs = addBugs(grid);

// 3 - scanner la zone pour ajouter le nombres de mines autour d'une cellule
const scanArea = (grid) => {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
            if (grid[rowIndex][colIndex] === "B") {

                // en haut
                if (typeof grid[rowIndex -1]?.[colIndex] === "number") {
                    grid[rowIndex -1][colIndex]++;
                }
                // en haut à droite 
                if (typeof grid[rowIndex -1]?.[colIndex + 1] === "number") {
                    grid[rowIndex -1][colIndex + 1]++;
                }
                // à droite
                if (typeof grid[rowIndex]?.[colIndex + 1] === "number") {
                    grid[rowIndex][colIndex + 1]++;
                }
                // en bas à droite 
                if (typeof grid[rowIndex + 1]?.[colIndex + 1] === "number") {
                    grid[rowIndex + 1][colIndex + 1]++;
                }
                // en bas
                if (typeof grid[rowIndex + 1]?.[colIndex] === "number") {
                    grid[rowIndex + 1][colIndex]++;
                }
                // en bas à gauche
                if (typeof grid[rowIndex + 1]?.[colIndex - 1] === "number") {
                    grid[rowIndex + 1][colIndex - 1]++;
                }
                // à gauche
                if (typeof grid [rowIndex]?.[colIndex - 1] === "number") {
                    grid[rowIndex][colIndex - 1]++;
                }
                 // en haut à gauche
                if (typeof grid [rowIndex - 1]?.[colIndex - 1] === "number") {
                    grid[rowIndex - 1][colIndex - 1]++;
                 }     
            }
        }
    }
    return grid;
};
const modifiedGrid = scanArea(grid); // appliquer la fonction scanArea à la grille virtuelle
console.table(modifiedGrid); // afficher la grille modifiée dans la console

console.log(bugs);



// 4 - creer une grille html (sera visible sur la)
const createHTMLGrid = (grid) => {
    const html = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
           const divEl = document.createElement("div");
           divEl.classList.add(
                'cell',
                'cell-hidden',
                'cell-row-${rowIndex}-col-${colIndex}'
           );
           divEl.dataset.rowIndex = rowIndex;
           divEl.dataset.colIndex = colIndex;

           divEl.textContent = grid[colIndex][rowIndex];


           if(typeof grid[colIndex][rowIndex] === "number"){
            divEl.textContent = grid[colIndex][rowIndex];

           }
           html.push(divEl);
        }
    }
    
    document.querySelector('.grid').append(...html);
    // html = [divEl1, divEl2, divEl3, divEl4...] => .append([...])
    
};
/*
// 5 - integration  des evenemnts de clics (dévoiler une cellule, ajouter un drapeau).
const addEventListeners = (grid) => {
    const gridEl = document.querySelector('.grid');
    gridEl.addEventListener('click',({ target }) => {
        if (!target.matches(".cell-hidden")){
            return;
        }

        const { rowIndex, colIndex } = target.dataset;
        const row = Number(rowIndex);
        const col = Number(colIndex);

       const unveil = ({col, row, grid, target}) => {
        target.calssList.remove("cell-hidden");

        switch(grid[row][col]) {
            case "B":
                // B stuff
                target.classList.add("cell-bug");

                setTimeout(() => {
                    alert("Perdu!")
                    window.location = "";
                }, 3000);
                break;

            case 0:
                // empty
                target.classList.add("cell-empty");
                const showEmptyCells = (grid) => {
                    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
                        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
                           if (typeof grid[rowIndex][colIndex] === 0) {
                            // cell-empty
                            document.querySelector('')
                           }
                           if (typeof grid[rowIndex][colIndex] === 1){

                           }
                        }
                        
                };
                // TODU - recursion : unveil all empty
                // HACK - for loop: unveil empty
                 break;

            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            default:
                const num = grid[row][col];
                target.classList.add('cell-num', 'cell-num-${num}');
                target.textContent = num;
                break;
        }
       }
    });
}
*/
console.table(grid);