let mainTab = document.getElementById("mainTab");
let tab = [];

document.querySelectorAll(".level").forEach((button) =>
  button.addEventListener("click", (e) => {
    defineDifficulty(e);
  })
);
function defineDifficulty(e) {
  switch (e.target.innerHTML) {
    case "Easy":
      tabF(4);
      setTimeout(() => defineBomb(5, 4), 50);
      break;
    case "Medium":
      tabF(15);
      setTimeout(() => defineBomb(10, 15), 50);
      break;
    case "Hard":
      tabF(30);
      setTimeout(() => defineBomb(100, 30), 50);
      break;
    case "Extreme":
      tabF(60);
      setTimeout(() => defineBomb(1000, 60), 50);
      break;
  }
}
const tabF = (size) => {
  tab = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    tab.push(row);
  }
  console.log(tab);
  return tab;
};

function defineBomb(nbBombs, size) {
  console.log(tab);
  let i = 0;
  let listBomb = [];
  while (i < nbBombs) {
    let rowBomb = Math.floor(Math.random() * size);
    let colBomb = Math.floor(Math.random() * size);
    if (!(tab[rowBomb][colBomb] == "b")) {
      tab[rowBomb][colBomb] = "b";
      listBomb.push(tab[rowBomb][colBomb]);
      i++;
    }
  }
  checkNbBomb(tab);
}
function createTab() {
  mainTab.innerHTML = "";
  for (let i = 0; i < tab.length; i++) {
    const row = document.createElement("tr");
    row.id = `${i}`;
    for (let j = 0; j < tab.length; j++) {
      const cell = document.createElement("td");
      const buttons = document.createElement("button");
      buttons.classList = "btn";
      buttons.id = `[${i}][${j}]`;
      buttons.dataset.rowIndex = i;
      buttons.dataset.colIndex = j;
      cell.appendChild(buttons);
      row.appendChild(cell);
    }
    mainTab.appendChild(row);
  }
  document.querySelectorAll(".btn").forEach((x) => {
    x.addEventListener("mousedown", clic);
  });
  console.table(tab);
}

function checkMines(row, col) {
  let mine = 0

  

}


/*function checkNbBomb() {
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[i][j] === "b") {
        if (i > 0 && typeof tab[i - 1][j] === "number") tab[i - 1][j]++;
        if (i > 0 && j > 0 && typeof tab[i - 1][j - 1] === "number")
          tab[i - 1][j - 1]++;
        if (
          i > 0 &&
          j < tab[i].length - 1 &&
          typeof tab[i - 1][j + 1] === "number"
        )
          tab[i - 1][j + 1]++;
        if (j > 0 && typeof tab[i][j - 1] === "number") tab[i][j - 1]++;
        if (j < tab[i].length - 1 && typeof tab[i][j + 1] === "number")
          tab[i][j + 1]++;
        if (
          i < tab.length - 1 &&
          j > 0 &&
          typeof tab[i + 1][j - 1] === "number"
        )
          tab[i + 1][j - 1]++;
        if (i < tab.length - 1 && typeof tab[i + 1][j] === "number")
          tab[i + 1][j]++;
        if (
          i < tab.length - 1 &&
          j < tab[i].length - 1 &&
          typeof tab[i + 1][j + 1] === "number"
        )
          tab[i + 1][j + 1]++;
      }
    }
  }
  createTab(tab);
}
function clic(e) {
  const { rowIndex, colIndex } = e.target.dataset;
  const row = parseInt(rowIndex);
  const col = parseInt(colIndex);
  const num = tab[row][col];
  if (e.button == 0) {
    if (num === "b") {
      console.log("boom!");
      e.target.style.backgroundImage = "url('images/boom.png')";
    } else {
      e.target.style.background = "transparent";
      if (num > 0) {
        e.target.innerHTML = num;
      } else {
      }
    }
  } else if (e.button == 1) {
  }
}*/
